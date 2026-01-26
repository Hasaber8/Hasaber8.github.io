---
title: "Agents and Me: Experiments with AI Workflows in Production"
date: 2026-01-05
---

The agent hallucinated an entire sprint retro. Random names for teammates. Made-up sprint points. Fictional work assignments. It confidently documented a meeting that never happened with people who didn't exist.
That was one of our more memorable failures. But six months of giving everyone on my team at Esper.io their own AI agent taught us more than what breaks, it showed us what actually works in production.

These experiments and experiences are from my time at my co-op at [Esper.io](http://Esper.io); Esper is a leading MDM purpose-built for dedicated devices. 
While my co-op primarily focused on backend/tooling development, thanks to my mentor, manager, and Director of Engineering, Devashish, our team also focused on improving developer experience across the board using AI agents, not just for coding but also for workflows and daily usage.  
The timing was on our side: Just before my internship began in June of 2025, Claude Code went GA in May. Although I worked with Codex and Cursor's coding agents, the majority of what I'll discuss is centred around Claude Code-based agents.

Before Claude Code brought a general-purpose agent to be used by everyone (I hate that people think Claude Code is only for Coding!), building agents was a bit of a complicated process, at least to me at that time! Claude Code commodified the *mechanics*, which gave us more time to think about what and how the agent does. Not only that, but it also pushed other AI labs in the direction of terminal-based agent orchestrators (Codex, Gemini-cli, opencode, etc.) and gave Anthropic some [sweet-sweet revenue unlocking lever ~$1B!](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone)

---

Now, coming to the part where all the talk was put into action. What was done, how it worked, and what actually didn't work! (Quick note on our setup: we used Claude Code via AWS Bedrock for enterprise compliance, and one thing I did observe in this is that at times, some features in Claude Code were missing, not sure if it was an A/B testing thing or happening because we were using Bedrock. Personally I feel the 200$ max plan had really good limits before it for nerfed, but for compliance we stuck to claude via bedrock.)

## What We Built (And What We Learned)

### 1. The Claude.md Stack (And Why Rules Get Ignored)

**Our setup:** a monorepo with a root `claude.md` defining PR rules and coding standards, plus per-service `claude.md` files that Claude Code was supposed to stack automatically. In theory, this should have worked perfectly. In practice, Claude ignored these rules. Cursor's agent almost never did. I am still not entirely sure how much of this was model choice, Claude versus GPT-Codex in Cursor, versus tooling behavior, but the difference was consistent enough to notice.

What I think is happening comes down to how the two tools treat rules. Cursor indexes your entire codebase upfront and builds a semantic map of it. When you define rules in `.cursorrules`, they behave like hard constraints that are always present, always enforced, and do not compete with the rest of the task context. Claude Code does the opposite. It reads files lazily, injects `CLAUDE.md` content directly into the active context window, and relies on that raw context staying important throughout the session.

That is where things break down. In longer agentic workflows with dozens of tool calls and lots of intermediate reasoning, Claude Code starts to suffer from context decay. As the context grows, earlier instructions lose salience. On top of that, automatic compaction kicks in (more on this below!), summarizing or dropping parts of the conversation, and those carefully written rules are often the first casualty. Once that happens, the agent is not disobeying the rules; it simply no longer remembers them clearly.

And imo Monorepos makes this worse. Claude Code only discovers service-specific `claude.md` files when it happens to read something inside that directory. There is no proactive loading of per-service constraints. So, depending on which files the agent touches, your standards may or may not even enter context, and if they do, they are immediately competing with everything else the agent is juggling.

**The takeaway:** Cursor treats rules as durable constraints that live outside the attention budget. Claude Code treats them as regular context, and in complex workflows, regular context loses. If a rule truly matters, relying on passive markdown alone is not enough. You need enforcement, not just instruction.

---

### 2. Language-Specific Agents: The Context Window Problem and What Helped!

As I talked about above, dedicated agents for specific languages (Python agent, Go agent, etc.) seemed smart until context window issues and bad compacting destroyed output quality. The agent would lose critical context mid-task, leading to inconsistent code or outright hallucinations.

One of the things that helped me massively was to rather have Language Specific or Framework expert agents, which will only work on planning the solution to the problem, they would ask questions, analyse the problem (different thinking methods in CC come in clutch here), and then pass the coding part to a different agent. This way, the tiny tiny context of 200k tokens was preserved for doing the important work of planning! Also, the 1-million context window Sonnet model did not help much with this issue; I saw more severe context decay issues there too.

Lately, [Continuous-Claude-v2](https://github.com/parcadei/Continuous-Claude-v2) became my go-to solution because it handles context rotation intelligently - maintaining state across conversations without naive compacting that strips away the nuance the agent actually needs.

---

### 3. Personal Code Review Agents

Every engineer got their own code review agent. We generated `personal_agent.md` files that teammates could invoke via `/agents` in Claude Code for pre-PR reviews. These agent markdown files were generated in multiple ways, with one of my colleague, Nazeel, using his GitHub PR comments to teach the agent on how he comments, the language he uses, and the things he focuses on in his PR reviews!

**Personalization mattered more than we expected**. Generic review agents give you generic advice. Personal agents learned each engineer's patterns, and preferred style of comments- making reviews feel like feedback from a teammate who actually knew your code, not a linter with opinions.

---

### 4. Building the Esper MCP Server

I built the Esper MCP server *using* language-specific agents (Golang) + TDD.
**The workflow:** I'd write code in specific patterns, then have the agent (Codex in this case) understand and replicate the pattern across the codebase.

Teaching by example beats instruction when the pattern is complex. Writing 2-3 examples of the pattern I wanted, then letting the agent generalize, worked far better than trying to explain it in natural language. The agents broke down when patterns were too context-dependent or required domain knowledge it didn't have - at which point, the examples alone weren't enough.

The way I went about building the Esper MCP was a bit different from the traditional MCP setup. Due to the tenant-based nature of Esper, auth was a bit complicated so I relied on the already in place token generation method we had. This way I ended by building a small CLI tool for the mcp which handled the auth and had some other handy commands! 

The MCP tools aren't a direct 1:1 mapping of Esper's APIs. Based on feedback from customer-facing teams, we identified common user workflows that required multiple API calls and consolidated them into single MCP tools. For example, detecting 'Device Blueprint Drift' previously required several API calls. We turned that entire workflow into one simple tool.

Another aim was keep the descriptions as tight as possible (to save context!) but give the LLM the exact info it needs to trigger the tool at the correct time. We kept iterating on this and made quite good progress.

[Link to Esper MCP Server](https://help.esper.io/hc/en-us/articles/40471740547985-Esper-MCP-for-LLMs#h_01KA1W271REVNG3EZ152CD75K9)!

---

### 5. The Atlassian Agent

My manager wanted an agent to handle Agile ceremony work - connected to Jira, commenting and tagging on tickets, starting sprints. Claude Code orchestrated, with Jira MCP handling the integration.

Early runs required babysitting. The most memorable failure: hallucinated names across an entire sprint retro, coming up with random names for everyone in the team and it even gave everyone random sprint points and work (yikes!)

But once properly grounded with actual team rosters and project context, something interesting happened. The agent didn't just automate ticket creation - it *improved* it. With the introduction of /skills in Claude code, we were able to get a custom questioning mechanism (which was fairly deterministic!), which meant tickets emerged with significantly more detail than human-created ones. Where an engineer might write a couple of lines for the ticket without much detail, the agent would pursue a complete understanding.

Shout out to Devashish again, he jot down a few points here on this framework from a Director level.  
https://www.devashish.me/p/ai-adoption-framework-phase-1-minimalist

---

### 6. When Agents Lie About Being Done

Anthropic has talked extensively about [reward hacking](https://www.anthropic.com/research/reward-hacking) where models learn to game their training objectives rather than actually solving problems. They've worked to mitigate this in Claude, but in my experience with agentic workflows, it still surfaced in subtle ways.

The context decay problem from Claude.md rules showed up elsewhere too: premature task completion. Sonnet 4 and 4.5 would claim "Task complete!" without verifying anything actually worked. No tests run, no compilation checks, no output validation. Vague instructions made it worse. "Here's the db schema, write the gorm queries" led Opus to confidently implement patterns that didn't match our architecture. Sonnet would announce completion without checking if the code compiled.
The frustration here is real: I'd give the agent verification tools, and it would still skip them. It felt like the model learned that "say you're done" correlates with positive feedback, so it rushed there.

**What helped:** Being explicit about verification. Don't ask just for implementation, ask for implementation plus test execution. Force the verification into the task definition itself, don't leave it optional.

---

All things considered, these experiments helped me massively to understand how agents work fundamentally, what makes them work better, and what breaks them! Here are a few link of posts/users which helped me a lot in my discovery phase of agentic coding! But x.com in general has been my #1 source for tips and tricks wrt agents!

1. [https://x.com/trq212](https://x.com/trq212) - Claude Code @anthropicai, posts a lot of tips about general usage and new features; but also replies to people with feedback.  
2.  [https://x.com/iannuttall](https://x.com/iannuttall) - Just great tips and tricks across the board with coding agents!  
3. [https://x.com/bcherny](https://x.com/bcherny) - Creator of Claude, posts a lot of tips.  
4. [https://www.anthropic.com/engineering](https://www.anthropic.com/engineering) - Anthropic docs are a great source of truth for everything Claude Code!
