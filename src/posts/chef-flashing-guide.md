---
title: "Motorola One Power aka Chef Custom Rom Flashing Guide"
date: 2020-07-07
---

### In this guide we will be installing LineageOS official build. (Same guide can be used to flash any other custom rom!)

## Prerequisite:

1. Download LineageOS builds for chef from here: https://download.lineageos.org/chef
2. As Google apps are not included with the Rom download them from here: https://opengapps.org/, select ARM64 Android10 Nano Gapps.
3. Official TWRP builds from: https://dl.twrp.me/chef/twrp-3.5.0_9-0-chef.img.html
4. Copy-Partition Zip; VERY IMPORTANT FOR FLASHING ROM COMING FROM STOCK. (Get from telegram group)

* I expect you people already have necessary adb and fastboot drivers installed.

## Flashing process:
1. As you can see I'm on stock rom.

2. Reboot the device to fastboot and type the following command to boot into twrp.
```bash
fastboot boot <twrp.img>
```

3. Once you are in twrp go ahead and wipe your data

4. Once data is wiped go back to fastboot, and again boot into twrp.
```bash
fastboot boot <twrp.img>
```

5. Once in TWRP copy the Copy-Partition Zip to your device, and flash it.

6. Once flashed go ahead and wipe only the following partitions: System, Data, Cache, Dalvik/ART Cache

7. Once the partitions are wiped, reboot to fastboot, and again boot into twrp.
```bash
fastboot boot <twrp.img>
```

8. Now copy the Rom and Gapps files onto your device.

### Important Step

9. First just flash the LineageOS rom file, let it get installed and then again reboot to fastboot and then to twrp. 

10. Now flash the gapps files! (YOU DONT HAVE TO FLASH GAPPS WITH PIXEL EXPERIENCE ROM AS GAPPS ARE ALREADY INCLUDED IN ROM FILE)

11. We are done flashing! Now reboot to system and enjoy your Custom Rom!

### The step from here on are just for LineageOS!

12. Now reboot to fastboot and from there select the RECOVERY MODE option and boot into LineageOS recovery, in there select Factory reset option and reboot to system, and we are finally done!

### If you did everything correct you will boot into the rom!

## If you have any further doubts or issues join the Motorola One Power Group on Telegram: https://t.me/Hasaber8chat
