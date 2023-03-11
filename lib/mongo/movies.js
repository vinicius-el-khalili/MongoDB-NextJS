import clientPromise from "."

let client
let db
let movies

async function init(){
    if (db) return
    try{
        client = await clientPromise
        db = await client.db()
        movies = await db.collection ('movies')
    } catch (error) {
        throw new Error("Failed to stablish connection to database")
    }
}

(async()=>{
    await main()
})()

// Movies

export async function getMovies(){
    try{
        if (!movies) await init()
        const result = await movies
            .fint({})
            .limit(20)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return { movies:result }
    } catch (error) {
        return { error:"Failed to fatch movies" }
    }
}