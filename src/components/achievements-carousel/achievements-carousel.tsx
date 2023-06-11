'use client'

import { IBasketBallGame } from "@/src/database/schemas/basketball-game-schema"
import { IFootballGame } from "@/src/database/schemas/football-game-schema"
import { IHockeyGame } from "@/src/database/schemas/hockey-game-schema"
import { ISoccerGame } from "@/src/database/schemas/soccer-game-schema"
import { Carousel } from "react-responsive-carousel"

type AchievementsCarouselProps = {
    game: IBasketBallGame | IFootballGame | ISoccerGame | IHockeyGame | undefined
    sport: 'basketball' | 'soccer' | 'football' | 'hockey'
}

export const AchievementsCarousel = ({ game, sport }: AchievementsCarouselProps) => {


    return (
        <Carousel autoPlay={false} emulateTouch={true} infiniteLoop={true} axis="horizontal" showArrows={false} showIndicators={false} showThumbs={false} centerMode={true} showStatus={false}>
            {
                [<></>]
            }
        </Carousel>
    )
}