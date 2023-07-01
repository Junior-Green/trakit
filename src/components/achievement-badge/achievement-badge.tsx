'use client';

import classNames from "classnames";
import styles from './AchievmentBadge.module.css';
import {AngelWingsIcon, AnvilIcon, ArmIcon, AssistIcon, BasketballBlockIcon, BasketballDunkIcon, BrickWallIcon, BugIcon, ClockIcon, CoinsIcon, EyeIcon, FootballCatchIcon, FootballPickupIcon, GasMaskIcon, MeasuringTapeIcon, NinjaIcon, PassIcon, PenguinIcon, PinIcon, RescueIcon, SaveGoalIcon, SlimeIcon, StarIcon, StealIcon, SwordsIcon, TargetIcon, TurnoverIcon, WarningCardIcon} from "../svgs";

const badgeIconsList = ['assist', 'block', 'brick-wall', 'bug', 'clock', 'catch-football', 'pickup-football', 'measuring-tape', 'pass-ball', 'pin', 'rescue', 'save-goal', 'star', 'steal', 'reverse-arrows', 'swords', 'target', 'warning-card', 'eye', 'dunk-ball', 'slime', 'coins', 'penguin', 'angel-wings', 'ninja', 'arm', 'gas-mask', 'anvil'] as const;
type AchievementBadgeProps = {
    tier: 'bronze' | 'silver' | 'gold',
    badgeIcon: typeof badgeIconsList[number],
    size?: number;
};

export const AchievementBadge = ({badgeIcon, tier, size = 5}: AchievementBadgeProps) => {
    const iconSize =`${size}vmax`;
    let tierClassName: string = styles.bronze;
    if (tier === 'silver') {
        tierClassName = styles.silver;
    }
    else if (tier === 'gold') {
        tierClassName = styles.gold;
    }

    switch (badgeIcon) {
        case 'assist':
            return <AssistIcon width={iconSize} className={classNames(tierClassName, styles.badgeIcon)} />;
        case 'block':
            return <BasketballBlockIcon width={iconSize} className={classNames(tierClassName, styles.badgeIcon)} />;
        case 'brick-wall':
            return <BrickWallIcon width={iconSize} className={classNames(tierClassName, styles.badgeIcon)} />;
        case 'bug':
            return <BugIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'catch-football':
            return <FootballCatchIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'clock':
            return <ClockIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'measuring-tape':
            return <MeasuringTapeIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'pass-ball':
            return <PassIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'pickup-football':
            return <FootballPickupIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'pin':
            return <PinIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'rescue':
            return <RescueIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'reverse-arrows':
            return <TurnoverIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'save-goal':
            return <SaveGoalIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'star':
            return <StarIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'steal':
            return <StealIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'swords':
            return <SwordsIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'target':
            return <TargetIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'warning-card':
            return <WarningCardIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'eye':
            return <EyeIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'dunk-ball':
            return <BasketballDunkIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'slime':
            return <SlimeIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'coins':
            return <CoinsIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'penguin':
            return <PenguinIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'angel-wings':
            return <AngelWingsIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'ninja':
            return <NinjaIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'arm':
            return <ArmIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'gas-mask':
            return <GasMaskIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        case 'anvil':
            return <AnvilIcon width={iconSize} className={classNames(tierClassName, styles.badge)} />;
        default:
            return <></>;
    }
};