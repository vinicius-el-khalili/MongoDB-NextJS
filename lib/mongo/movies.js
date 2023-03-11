import clientPromise from "."

let client
let db
let movies

async function init(){
    if (db) return
    try{
        client = await clientPromise
        db = await client.db()
        movies = await db.collection ('openings')
    } catch (error) {
        throw new Error(error)
    }
}

(async()=>{
    await init()
})()

// Movies

export async function getMovies(){
    try{
        if (!movies) await init()
        const result = await movies
            .find({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { movies:result }
    } catch (error) {
        return { error: error }
    }
}