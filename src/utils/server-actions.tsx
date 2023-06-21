'use server';

import dbConnect from "../database/mongoose-connect";
import {ObjectId} from "mongodb";
import UserData from "../database/schemas/user-schema";

export async function deleteGame(userId: string, id: string): Promise<boolean> {
    await dbConnect();

    const user = await UserData.findOne({userId: new ObjectId(userId)});

    if (!user) return Promise.reject('User not found');

    const filterKey = `${user.selectedSport}Seasons`;
    const filterQuery: any = {};

    filterQuery[filterKey] = {
        "$elemMatch": {
            "games._id": new ObjectId(id)
        }
    };
    filterQuery.userId = new ObjectId(userId);

    const pullQueryKey = `${user.selectedSport}Seasons.$.games`;
    const pullQuery: any = {};
    pullQuery[pullQueryKey] = {"_id": new ObjectId(id)};

    return await UserData.updateOne(
        filterQuery,
        {$pull: pullQuery}
    ).then((res) => {
        console.log(res);
        return res.modifiedCount != 0;
    }).catch((err) => {
        console.error(err);
        return false;
    });
}
