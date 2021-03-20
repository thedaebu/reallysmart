# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Track.destroy_all

User.create(username: 'reallysmart', password: 'reallysmart')

Track.create(
    title: 'El Chapo', 
    artist: 'The Game', 
    artwork_path: 'https://i.ytimg.com/vi/RviOwY0OKyE/maxresdefault.jpg', 
    lyrics: 
"[Intro: The Game]
Skrillex
Bangladesh
I am the God (God, God, God)
(God, God, God, God)

[Chorus: The Game]
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)

[Verse 1: The Game]
You know I get the kilos
Cincuenta porciento
If you are not bilingual
Get the fuck up out of town, 'fore we run your ass down
Underground how I came out, any nigga try to stop me
Let it hang out, let it bang, let it rain out
Yo soy el dios
You adios, nigga (I am the God)
Seen a nigga chopped up on a Tuesday
While the club goin' up on a Tuesday
This is doomsday, I can have Guadalupe
Come through and knock Donald Trump out his toupee
Now look at his brains all on the sidewalk
And tuck the .38 and jump on my skywalker
And whew, I'm rollin'
Shotgun, Claudia Ochoa (I am the God)
Only nigga walking through Sinaloa with the blood
Red Chuck Taylors on and you know it when I show up
It's a squad full of killers, squad full of hittas, squad full of
Niggas that'll pull up, let it bark on a nigga
Hundred six shots bark on a nigga, street sweeper wet
The whole block up, Noah's Ark on a nigga
Got two Glock 9s, two .45s, two Desert
Eagles and they fly together side by side
No juego conmigo, tu sabes de mio
No Tony Montana, mis amigos, mis kilos
Mi casa, su casa, cuidado con el chico
Tu quieres la blanca, yo tengo el perico
(Ya te dije el juego y fuego)

[Chorus: The Game]
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
Nigga, I am the God (God, God, God, God, God, God, God)

[Interlude 1: The Game]
Pinche policías (Puto)
Jodiendo todo el día (Cabrón)
Que si jode tu familia (Mátalo)
On mi madre y mi tía (Así)

[Verse 2: The Game]
I'm on a private jet with El Chapo, feet up
Sippin' Tecate bout to land for the re-up
Fuck the Montanas, we ain't got them trackin'
Devices, the feds they be watchin' and see us
Niggas wanna see us? Check the IG
I'm in the villa throwin' blood up like a IV
Don't try me, DeJ Loaf with the AK, 600
Million, 400 million from Dre Day, uh
Pablo Escobar in my hey-day, uh
Billion off coke that's a payday, uh
On a private jet that's a mayday, uh
In South America on a vacay, uh
P on my snapback, choppin' grade-a, uh
None of these niggas ready for the melee, uh
Hundred cal make his body do the Nae Nae, leave a nigga
Face worse off than Sheneneh, yo
I am the God, I've been tellin' you niggas
I got a bird and a chopper in the
Trunk, ven aqui, I will sell it to niggas
We can screw it and chop it
Machetes on deck, I will sever you niggas
Behind these bars I'm El Chapo
Motorcycle out the cell on you niggas

[Interlude 2: Candy Fuego]
Escúchame: ¡chinga tu madre!
Nunca me encontrarás
So para de mirar
No me controlas, te controlo
Controlo a todos
Me respetan o se mueren
Soy El Chapo y la hago en Sinaloa

[Chorus: The Game]
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
I am the God (God, God, God, God, God, God, God)
El Chapo (whoo, whoo, whoo, whoo, whoo, whoo)
Nigga, I am the God (God, God, God, God, God, God, God)

[Outro: The Game]
Nigga, I am the God"
)

Track.create(
    title: 'Selene', 
    artist: 'NIKI', 
    artwork_path: 'https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg', 
    lyrics: 
"[Verse 1]
She's taken over
She's making me want your body closer
Having a little trouble staying sober
And she's got us all under her trance
Oh, she's elusive (I know)
She only rises with the music
And all of my dreams, they're growing lucid
That's how you know she's up to dance
To dance, to dance, to dance

[Pre-Chorus]
And now she's taking over me
A new notch on her belt, yeah
And your face gleams like a prophecy
I might just lose myself, yeah

[Chorus]
And I couldn't care less (Uh)
I couldn't care less, baby
Feeling just a little careless lately
Push me back and pull me under (Ah-ah)
She got me possessed (Uh)
I'm looking to get hasty
And I just want your body pressed against me
Take me down to lift me high
Take me down to lift me high
Higher, higher, ooh

[Verse 2]
White flames on her torch, they're licking on the air tonight (Uh)
Chariot skid marks all over the gravel behind my eyes
Take my hand 'cause when this ends, I run
No man's land sounds like a woman's fun
We got all night long
Oh, won't ya give it to me, give it to me, ah

[Pre-Chorus]
And oh, she's bubbling up again, and I do as I'm told
May be losing all my self-control

[Chorus]
And I couldn't care less (Uh)
I couldn't care less, baby
Feeling just a little careless lately
Push me back and pull me under (Ah-ah)
She got me possessed (Uh)
I'm looking to get hasty
And I just want your body pressed against me
Take me down to lift me high
Take me down to lift me high
Higher, higher, ooh

[Outro]
Higher, higher, ooh
Higher, higher, ooh
Take me down to lift me high
Take me down to lift me high
Higher, higher, ooh"
)

Track.create(
    title: 'Revenge', 
    artist: 'Tiffany Day', 
    artwork_path: 'https://i1.sndcdn.com/artworks-gmFbAzVcPDjVJgzn-87w1Eg-t500x500.jpg', 
    lyrics: "[Verse 1]
I only want you for the night
Yeah, when it's over, I think it's best to say goodbye to you
Think I'm done with you, with you
Don't think I let you in it twice
'Cause after all you never cared as much as I do
I was down for you, for you

[Pre-Chorus 1]
Now I'm a heartbreaker, never chasing after yo ass
No, you can't take it when I make it up to first class
Im a wild one, no love left in the past
I'm new
I'm new

[Chorus]
You're mistaken, I'm not breaking and you don't get me again, yeah yeah
Im not foolish, I've been through this and I don't want to pretend that you were allowed with it all from the start
I know you've been fakin', it don't work too hard anymore
A heartbreaker, you can't take it, and I will get my revenge, yeah yeah

[Verse 2]
Posing up on TV, now you wanna see me
But you don't get to see shit
Thinking that you know me, claiming that you own me
But you never think about all the times you say you had it
And all the lies you used, you had me down
So very down

[Pre-Chorus 2]
Now I'm a heartbreaking, never chasing after yo ass
No, you can't take it when I make it up to first class
Im a wild one, no love left in the past, it's true
It's true

You're a cloud chaser, always fakin' what you could be
Never took the time to let me know what I should have seen
I'm a wild one, no love
I'm new, I'm new

[Chorus]
You're mistaken, I'm not breaking and you don't get me again, yeah yeah
Im not foolish, I've been trough this and I don't want to pretend that you were allowed with it all from the start
I know you've been fakin', it don't work too hard anymore
A heartbreaker, you can't take it, and I will get my revenge, yeah yeah"
)