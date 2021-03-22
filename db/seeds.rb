# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Track.destroy_all

reallysmart = User.create(
    username: 'reallysmart', 
    password: 'reallysmart'
)

el_chapo = Track.create(
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

selene = Track.create(
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

fake_love = Track.create(
    title: 'Fake Love', 
    artist: 'Drake', 
    artwork_path: 'https://images.genius.com/65dacc63f81321a1cee1435f303a1bf5.1000x1000x1.jpg', 
    lyrics: 
"[Chorus]
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face

[Verse 1]
Somethin' ain't right when we talkin'
Somethin' ain't right when we talkin'
Look like you hidin' your problems
Really you never was solid
No, you can't 'son' me
You won't never get to run me
Just when shit look out of reach
I reach back like one, three
Like one, three, yeah

[Pre-Chorus]
That's when they smile in my face
Whole time they wanna take my place
Whole time they wanna take my place
Whole time they wanna take my place
Yeah, I know they wanna take my place
I can tell that love is fake
I don't trust a word you say
How you wanna clique up after your mistakes?
Look you in the face, and it's just not the same

[Chorus]
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face

[Verse 2]
Yeah, straight up to my face, tryna play it safe
Vibe switch like night and day
I can see it, like, right away
I came up, you changed up
I caught that whole play
Since, things never been the same

[Pre-Chorus]
That's when they smile in my face
Whole time they wanna take my place
Whole time they wanna take my place
Whole time they wanna take my place
Yeah, I know they wanna take my place
I can tell that love is fake (I can tell that love is fake)
I don't trust a word you say (I don't trust a word)
How you wanna clique up after your mistakes?
(That's just what I heard)
Look you in the face, and it's just not the same

[Chorus]
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face
I've been down so long, it look like up to me
They look up to me
I got fake people showin' fake love to me
Straight up to my face, straight up to my face

[Outro]
Skrrt
And more chune for your headtop
So watch how you speak on my name, you know?"
)

annotation1 = Annotation.create(
    body: "This is a great line because it is.",
    annotator_id: reallysmart.id,
    track_id: fake_love.id,
    start_index: 5,
    end_index: 10,
)

annotation2 = Annotation.create(
    body: "This shows everything and everythang and everythin and every thing and keeps on going. Whoooooooo!",
    annotator_id: reallysmart.id,
    track_id: fake_love.id,
    start_index: 15,
    end_index: 20,
)
