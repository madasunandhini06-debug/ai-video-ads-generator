import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {

    const result = await axios.get('https://openapi.akool.com/api/open/v3/avatar/list?type=1&page=3',
        {
            headers: {
                Authorization: `Bearer ${process.env.AKOOL_API_TOKEN}`
            }
        }
    );

    return NextResponse.json(JSON.parse(JSON.stringify(result.data?.data || [])))
}