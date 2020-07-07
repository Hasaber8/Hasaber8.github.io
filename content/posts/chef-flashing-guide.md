---
title: "Motorola One Power aka Chef Custom Rom Flashing Guide"
date: 2020-07-07 10:24:00 +0530
---

### In this guide we will be installing LineageOS official build. (Same guide can be used to flash any other custom rom!)

## Prerequisite:-

1. Download LineageOS builds for chef from here:- (https://download.lineageos.org/chef)
2. As Google apps are not included with the Rom download them from here:- (https://opengapps.org/), select ARM64 Android10 Nano Gapps.
3. Official TWRP builds from:- (https://dl.twrp.me/chef/twrp-3.4.0-0-chef.img.html)
4. Copy-Partition Zip; VERY IMPORTANT FOR FLASHING ROM COMING FROM STOCK. (https://drive.google.com/file/d/1_3NEgeTVujvFAfRs8Gdd0Ft0yRf9YjyJ/view?usp=sharing)

![Screenshot 2020-07-07 at 19 08 56](https://user-images.githubusercontent.com/43720061/86805570-9a52d000-c095-11ea-8375-878d876ab01d.png)

* ### I expect you people already have necessary adb and fastboot drivers installed.

## Flashing process:-
1. As you can see I'm on stock rom

![IMG_20200707_190606](https://user-images.githubusercontent.com/43720061/86801637-de43d600-c091-11ea-82b8-bb268b1c8efc.jpg)

2. Reboot the device to fastboot and type the folow command to boot into twrp
```bash
fastboot boot <twrp.img>
```

3. Once you are in twrp go ahead and wipe your data

![IMG_20200707_191008](https://user-images.githubusercontent.com/43720061/86809655-b6587080-c099-11ea-80bc-350f6498860b.jpg)

4. Once data is wiped go back to fastboot, and again boot into twrp
```bash
fastboot boot <twrp.img>
```
![Screenshot 2020-07-07 at 19 11 06](https://user-images.githubusercontent.com/43720061/86809874-f7508500-c099-11ea-85fb-3bd938d19b10.png)

5. Once in TWRP copy the Copy-Partition Zip to yuor device, and flash it

![Screenshot 2020-07-07 at 19 11 19](https://user-images.githubusercontent.com/43720061/86810013-1ea75200-c09a-11ea-97ba-2422362705ee.png)

6. Once flashed go ahead and wipe only the following partitions:- 

![IMG_20200707_191238](https://user-images.githubusercontent.com/43720061/86810284-6332ed80-c09a-11ea-9b83-49add0f36802.jpg)

7. Once the partitions are wiped, reboot to fastboot, and again boot into twrp
```bash
fastboot boot <twrp.img>
```

8. Now copy the Rom and Gapps files onto your device

![Screenshot 2020-07-07 at 19 13 56](https://user-images.githubusercontent.com/43720061/86810668-c9b80b80-c09a-11ea-9a1b-0017c7f849a8.png)

### Important Step

9. First just flash the LineageOS rom file, let it get installed and then again reboot to fastboot and then to twrp. 

10. Now flash the gapps files! (YOU DONT HAVE TO FLASH GAPPS WITH PIXEL EXPERIENCE ROM AS GAPPS ARE ALREADY INCLUDED IN ROM FILE)

![IMG_20200707_192024](https://user-images.githubusercontent.com/43720061/86810996-113e9780-c09b-11ea-808b-3c7f390116a1.jpg)

11. We are done flashing! Now reboot to system and enjoy your Custom Rom!

### The step from here on are just for LineageOS!

12. Now reboot to fastboot and from there select the RECOVERY MODE option and boot into LineageOS recovery, in there select Factory reset option and reboot to system, and we are finally done!

### If you did everything correct you will boot into the rom!

![IMG_20200707_193358](https://user-images.githubusercontent.com/43720061/86811764-e86ad200-c09b-11ea-8926-fcee2e744188.jpg)

## If you have any further doubts or issues join the Motorola One Power Group on Telegram:- (https://t.me/chefmain)


