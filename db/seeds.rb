require "open-uri"

# avatar_file = open("https://really-smart-seeds.s3.amazonaws.com/default_avatar.png")
reallysmart = User.create(
    username: "reallysmart", 
    password: "reallysmart"
)
# reallysmart.avatar.attach(io: avatar_file, filename: "default_avatar.png")

# avatar_file = open("https://really-smart-seeds.s3.amazonaws.com/default_avatar.png")
notsosmart = User.create(
    username: "notsosmart",
    password: "notsosmart"
)
# notsosmart.avatar.attach(io: avatar_file, filename: "default_avatar.png")

selene = Track.create(
    artist: "NIKI",
    artwork_path: "https://i.ytimg.com/vi/GBqqoPSJ9GY/maxresdefault.jpg",
    lyrics:
"[Verse 1]
She's taken over
She's making me want your body closer
Having a little trouble staying sober
And she's got us all under her trance
Oh, she's elusive (I know)
She only rises with the music
And all of my dreams, they're growing lucid
That's how you know she's up to dance
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
Higher, higher, ooh",
    spotify_path: "https://open.spotify.com/embed/track/0h11wE1hTwKMxYd1NACgNb?si=acc1559482e74faa",
    title: "Selene"
)

lady = Track.create(
    artist: "Modjo",
    artwork_path: "https://i.ytimg.com/vi/Z0V4CtdXlhk/maxresdefault.jpg",
    lyrics:
"[Chorus]
Lady, hear me tonight
'Cause my feeling, is just so right
As we dance, by the moonlight
Can't you see, you're my delight
Lady, I just feel like
I won't get you, out of my mind
I feel love, for the first time
And I know that it's true, I can tell by the look in your eyes",
    spotify_path: "https://open.spotify.com/embed/track/49X0LAl6faAusYq02PRAY6?si=f26ecb25d41d4182",
    title: "Lady"
)

fake_love = Track.create(
    artist: "Drake",
    artwork_path: "https://images.genius.com/65dacc63f81321a1cee1435f303a1bf5.1000x1000x1.jpg",
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
So watch how you speak on my name, you know?",
    spotify_path: "https://open.spotify.com/embed/track/343YBumqHu19cGoGARUTsd?si=49bcabba50714226",
    title: "Fake Love"
)

river = Track.create(
    artist: "Bishop Briggs",
    artwork_path: "https://images.genius.com/2f7cccb4dfe4cd619758a9d436faa5eb.1000x1000x1.png",
    lyrics:
"[Intro]
Like a river, like a river, sh-
Like a river, like a river, sh-
Like a river, like a river
Shut your mouth and run me like a river

[Verse 1]
How do you fall in love?
Harder than a bullet could hit you
How do we fall apart?
Faster than a hairpin trigger

[Pre-Chorus]
Don't you say, don't you say it
Don't say, don't you say it
One breath, it'll just break it
So shut your mouth and run me like a river

[Chorus]
Shut your mouth, baby, stand and deliver
Holy hands, will they make me a sinner?
Like a river, like a river
Shut your mouth and run me like a river
Choke this love 'til the veins start to shiver
One last breath 'til the tears start to wither
Like a river, like a river
Shut your mouth and run me like a river

[Verse 2]
Tales of an endless heart
Cursed is the fool who's willing
Can't change the way we are
One kiss away from killing

[Pre-Chorus]
Don't you say, don't you say it
Don't say, don't you say it
One breath, it'll just break it
So shut your mouth and run me like a river

[Chorus]
Shut your mouth, baby, stand and deliver
Holy hands, will they make me a sinner?
Like a river, like a river
Shut your mouth and run me like a river
Choke this love 'til the veins start to shiver
One last breath 'til the tears start to wither
Like a river, like a river
Shut your mouth and run me like a river

[Bridge]
Like a river, like a river, sh-
Like a river, like a river, sh-
Like a river, like a river
Shut your mouth and run me like a river
Hey! Oh, oh-oh-oh, oh!
Hey! Oh, oh-oh-oh, oh! (Like a river)
Hey! Oh, oh-oh-oh, oh, oh!
Oh, oh, oh, oh, oh! (Like a river)
Like a river

[Chorus]
Shut your mouth, baby, stand and deliver (Like a river, like a river)
Holy hands, will they make me a sinner? (Like a river, like a river)
Like a river, like a river
Shut your mouth and run me like a river
Choke this love 'til the veins start to shiver (Like a river, like a river)
One last breath 'til the tears start to wither (Like a river, like a river)
Like a river, like a river
Shut your mouth and run me like a river",
    spotify_path: "https://open.spotify.com/embed/track/3mRLHiSHYtC8Hk7bzZdUs1?si=f6fdb9460fb44bab",
    title: "River"
)

reflection = Track.create(
    artist: "Lea Salonga",
    artwork_path: "https://i.ytimg.com/vi/RxUmbraYDcE/hqdefault.jpg",
    lyrics:
"[MULAN]
Look at me, I will never pass for a perfect bride
Or a perfect daughter
Can it be I'm not meant to play this part?
Now I see that if I were truly to be myself
I would break my family's heart

Who is that girl I see
Staring straight back at me?
Why is my reflection someone I don't know?
Somehow I cannot hide
Who I am, though I've tried
When will my reflection show who I am inside?
When will my reflection show who I am inside?",
    spotify_path: "https://open.spotify.com/embed/track/2AILbz83cBnrAMAG06rZts?si=08fa531e6f004bd7",
    title: "Reflection"
)

stay = Track.create(
    artist: "Ne-Yo",
    artwork_path: "https://images-na.ssl-images-amazon.com/images/I/516J-AHuqOL._SY355_.jpg",
    lyrics:
"[Intro: Peedi Peedi]
Que linda ma, que linda ma, tu que linda ma, que linda ma, que linda ma
Let's go!

[Verse 1: Ne-Yo]
The room is spinnin'
And I can't breathe
And oh my head is just achin'
Hands won't stop sweatin'
And my knees girl they just won't stop shakin'
My stomach is turnin' flips
And I feel sick
You see (yeah)
And this is all just at the thought of you leavin' me

[Hook: Ne-Yo]
(Baby I'm a fool)
Am I stupid?
(Baby I'm a fiend)
Addicted to it
(Baby I don't know)
But your my get right when it's wrong
(Baby it's your smile)
Makes me happy
(Baby it's your touch)
So relaxing
(Whatever it is)
Without it I just can't go on
And I want you to know that

[Chorus: Ne-Yo]
I just can't help myself
I just can't help myself
I don't need nothin' else
All I need is you
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me

[Verse 2: Ne-Yo]
Never gonna be without cha'
See myself with only you
Finally found my inspiration
Here your voice sing
(Baby oooh)
Anything I gotcha'
Watcha' want indeed I'll be
Cause you are my everything
So baby please just stay with me

[Hook: Ne-Yo]
(Baby I'm a fool)
Am I stupid?
(Baby I'm a fiend)
Addicted to it
(Baby I don't know)
But your my get right when it's wrong
(Baby it's your smile)
Makes me happy
(Baby it's your touch)
So relaxing
(Whatever it is)
Without it I just can't go on
And I want you to know that

[Chorus: Ne-Yo]
I just can't help myself
I just can't help myself
I don't need nothin' else
All I need is you
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me

[Verse 3: Peedi Peedi]
Dah dah dah dah dah
NOW
Live from the 215
My babygirl ride right on my left handside
Mercedes rug slide through the palm of a dime
The brother known best
It's the prince
And you my princess
Let's get it on
Mami que-linda
Look at cha' beautiful smile
I don't wanna leave ya
Why don't cha stay for a while?
I love to love ya
Like heavy bum-bum-tiddly-dee
Take off ya sneaks
And lemme tickle ya feet
Peedi a libra
You think that Peddi a freak
Oooh you a Leo
I heard they rather unique
You're such a diva
You're such a pleasure to meet
Your one of your stature
One in a million
Nothin' else matters

[Bridge: Ne-yo]
Cause I love to turn you on
Your like my favorite song
Without you, would be wrong (would be wrong)
Forever and always
Did you know what you do for me?
Love you, you're my melody
Wearin' my heart on my sleeve (music)
You're all I need

[Chorus: Ne-Yo]
I just can't help myself
I just can't help myself
I don't need nothin' else
All I need is you
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me
Why don't you just
Stay with me",
    spotify_path: "https://open.spotify.com/embed/track/6tVUf0iGHpxmAWwp11I9eP?si=7db59af51b7241ca",
    title: "Stay"
)

just_a_friend_2002 = Track.create(
    artist: "Mario",
    artwork_path: "https://images-na.ssl-images-amazon.com/images/I/81YWIIhIlnL.jpg",
    lyrics:
"[Intro]
You Ready for me

[Verse 1]
I wanna know your name and
I wanna know if you gotta man (I wanna know)
I wanna know everything
I wanna know your number and if I can come over and
I wanna know what you like
I wanna know so I can do it all night
But you're telling me I'm just a friend
You're telling me I'm just a friend

[Chorus]
Oh baby you (oh baby you)
Got what I need (got what I need)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend
Cause I can be your (cause I can be your)
Fantasy
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend

[Verse 2]
I wanna know you in and out
I wanna know what you're all about (I wanna know)
I wanna know what makes you laugh
I wanna know about your past
I wanna know how you move
I wanna know so I can move too (I wanna know)
But you're telling me I'm just a friend
Telling me I'm just a friend

[Chorus]+(Mario)
Oh baby you (oh baby you)
Got what I need (got what I need, yeah)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend
Cause I can be your (girl I can be your)
Fantasy (fantasy, yeah)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend
Oh baby you (oh baby you)
Got what I need (got what I need, yeah)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend (woah oh)
Cause I can be your
Fantasy (fantasy)
But you say I'm just a friend (but you say I'm just a friend girl)
But you say I'm just a friend

[Mario]
Oh can you give me one reason why (why)
You wouldn't want this kinda guy
Cause I stay dipped, I stay laced
And I know, you know I'm fly
Girl, stop playing games with me
And let's get it on tonight
You got nothing to lose
Let me do what I do

[Chorus 2x]
Oh baby you
Got what I need (got what I need)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend
(Just wanna be your)
Cause I can be your fantasy (fantasy, girl)
But you say I'm just a friend (but you say )
But you say I'm just a friend
Oh baby you (oh baby you)
Got what I need (got what I need)
But you say I'm just a friend (say I'm just a friend)
But you say I'm just a friend (say I'm just a friend)
Cause I can be your fantasy (can I be your fantasy)
But you say I'm just a friend (c'mon girl)
But you say I'm just a friend

[Breakdown]
You can call me anytime you like (oh anytime)
It doesn't matter day or night (said it doesn't matter)
We can do whatever you (ohh)
Wanna do it's up to you
Don't fight the feeling that you feel (don't fight the feeling)
I can tell that its real (woah girl)
So won't you help me understand (but you say I'm just a)
Why you say I'm just a friend (but you say I'm just a friend)

[Chorus]
Oh baby you
Got what I need (woah)
But you say I'm just a friend (mmh, oh)
But you say I'm just a friend
Cause I can be your fantasy (I can be your, I can be your fantasy)
But you say I'm just a friend (yes me, me)
But you say I'm just a friend",
    spotify_path: "https://open.spotify.com/embed/track/2cxbxpHrND6i4uvUGVvC9J?si=6e2e46c2dd8a4b60",
    title: "Just a Friend 2002"
)

revenge = Track.create(
    artist: "Tiffany Day",
    artwork_path: "https://i1.sndcdn.com/artworks-gmFbAzVcPDjVJgzn-87w1Eg-t500x500.jpg",
    lyrics:
"[Verse 1]
I only want you for the night
Yeah, when it's over, I think it's best to say goodbye to you
Think I'm done with you, with you
Don't think I let you in it twice
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
Im not foolish, I've been through this and I don't want to pretend that you were allowed with it all from the start
I know you've been fakin', it don't work too hard anymore
A heartbreaker, you can't take it, and I will get my revenge, yeah yeah",
    spotify_path: "https://open.spotify.com/embed/track/5UgoWRTaUxHWm8xH2HBxxn?si=41f6d94ffd03447a",
    title: "Revenge"
)

blue = Track.create(
    artist: "Dynamic Duo",
    artwork_path: "https://popgasa1.files.wordpress.com/2019/08/3290161.jpg",
    lyrics:
"[Chorus: Gaeko & Crush]
하늘은 blue (oh yeah yeah)
옆엔 너 (all day, all day, yeah)
바다는 blue
뜨거워 so hot, 뜨거워 so hot
Baby it's so hot (it's so hot, umm)
여기 bluetooth (oh)
Play that song
Can you gimme that, gimme that
Gimme that, gimme that wine
I prefer the white one
잔 위에 시원한 ice, yeah
밤새도록 ride with me, yeah

[Verse 1: Gaeko]
며칠 전엔 Blue Square
지금은 호텔 beach chair
수영장 색깔은 밝은 파랑
그 앞에 바다는 진한 파랑
예쁘게 마른 너의 몸과 다리 위에 물방울과 오일
내 두 손은 붓이 돼, 수채화, 유화
뭐든 그릴 거야 하루 종일, yeah
Google 안에 미슐랭은 내일로 미루고
방 번호로 달아놓고 마셔
먼지와 겨울은 뒤로하고
구름과 태양을 저 하늘에 걸어놓고 마셔
무거운 머리는 비우고
가벼운 배는 채우고
피부는 미디엄 레어로
뜨거운 널 위에 태우고

[Pre-Chorus: Gaeko]
여기 여름은 우리 거야
Anything I will do it for ya
이 땅에 천사가 있다면 바로 너야
Amen, Amen
같이 빠져볼까 저 하늘 위로

[Chorus: Gaeko & Crush]
하늘은 blue (no no no)
옆엔 너 (all day, all day, yeah)
바다는 blue
뜨거워 so hot, 뜨거워 so hot
Baby it's so hot (umm, umm, umm, yeah)
여기 bluetooth (oh no)
Play that song
Can you gimme that, gimme that
Gimme that, gimme that wine
I prefer the white one
잔 위에 시원한 ice, yeah
밤새도록 ride with me, yeah

[Verse 2: Choiza]
밤바람에 춤추는 야자수
저기 멀리서 노래하는 파도
새까만 네 눈 속엔 은하수
난 그 속에 빠져 헤엄치는 사공
물은 적당한 미온수
너와 날 부드럽게 감싸고
시원하게 잘 식은 잘 익은 포도주는
혀끝부터 목을 타고 발포
날은 저물어서 어두워졌어
우리 둘뿐인데 뭘 더 걸쳐
수줍어 부끄러워하는 네가 귀여워
내 입술은 네 말을 멈춰
달빛에 수면은 번쩍
그 달빛이 네 몸에 번져
내 손은 눈부신 네 허리 위를 부드럽게 스치고
넌 나에게로 너를 던져

[Pre-Chorus: Gaeko & Choiza]
여기 여름은 우리 거야
Anything I will do it for ya
이 땅에 천사가 있다면 바로 너야
Amen, Amen
같이 빠져볼까 저 하늘 위로

[Chorus: Gaeko & Crush]
하늘은 blue (blue)
옆엔 너 (all day, all day, yeah, yeah)
바다는 blue (no, no, no, no)
뜨거워 so hot, 뜨거워 so hot
Baby it's so hot (baby it's so hot, oh oh)
여기 bluetooth (oh, yeah)
Play that song
Can you gimme that, gimme that
Gimme that, gimme that wine
I prefer the white one
잔 위에 시원한 ice, yeah
밤새도록 ride with me, yeah

[Verse 3: SOLE]
I'm the one inspires you, 아무 말도 말고
내 밤하늘을 가득 채워줘 baby
나의 하루는 전부 다, uh
All the things about you, yeah, yeah
아무 생각 없이 너와 나 더 깊이
뜨거운 해가 지기 전에 just dive in
우리 두 손을 잡은 채로 life is a game
오늘 밤새 I would say yes

[Outro: Choiza]
Okay, okay, 난 너만 있다면 oh yeah
넌 나란 요트의 돛대
너 가고 싶은 대로 가자 go, yeah
Okay, okay, 난 너만 원하면 oh yeah
오늘은 내가 네 노예
넌 쉬고 놀기만 해 go play
Okay, okay, 난 너만 있다면 oh yeah
넌 나란 요트의 돛대
너 가고 싶은 대로 가자 go, yeah
Okay, okay, 난 너만 원하면 oh yeah
오늘은 내가 네 노예
넌 쉬고 놀기만 해 go play",
    spotify_path: "https://open.spotify.com/embed/track/5XugX1MId7dSszZG8aaewX?si=fdbc74fad77c4220",
    title: "Blue"
)

shiki_no_uta = Track.create(
    artist: "Nujabes",
    artwork_path: "https://i2.wp.com/www.otaquest.com/wp-content/uploads/2020/05/Shiki-No-Uta-Is-One-Of-The-All-Time-Great-Anime-Endings.png?fit=1920%2C1080&ssl=1",
    lyrics:
"Mata yo ga akereba owakare 
yume wa tooki maboroshi ni 
anata wo oikaketeita hikari no naka de 
dakareru tabi atatakai kaze wo tayori

Haru wo tsuge 
odoridasu sansai 
natsu wo miru uji 
nohara karakusa kawaku wa 
aki no tsuki 
nobotta manmarusa oiwai 
fuyu wo sugi 
mata tsukihi wo kazore

Mada mabuta no oku ni aru 
itsuka no natsu 
toosugita aozora (atatakakatta) 
te wo tsunagu hanatsumi utau 
itsuya omoide (ate wa naku) 
Hadzuki kara mitsuki  
kumo to karamu tsuki 
mou itsuka kaeranu koto ni 
mezameta toki 
hitori kidzuki 
anata sagasu tabi ni 
ima yobisamasu kioku no naka de 
iza arukidasu 
anata no moto e

Mata yo ga akereba owakare 
yume wa tooki maboroshi ni 
anata wo oikaketeita hikari no naka de 
dakareru tabi 
atatakai kaze wo tayori

Haru wo tsuge 
odoridasu sansai 
natsu wo miru uji 
nohara karakusa kawaku wa 
aki no tsuki 
nobotta manmarusa oiwai 
fuyu wo sugi 
mata tsukihi wo kazoeru

Kimi ni yori nana 
hinoki kata yori ni 
kimi ni mita hana no kaori katami ni 
musubi yuku michi areba 
mata kaeri mi mu 
nagare ruru namida tome 
soka netsu-ru

Oikaze sakebu 
seijaku wo kowasu no 
nanimo osorezu susumu no 
kogane no hana ga hakobu no 
yasashisa ni anata ni futatabi ai ni 
ima seijaku wo kowasu no 
nanimo osorezu susumu no 
kogane no hana ga hakobu no 
yasashisa ni anata ni futatabi ai ni

Haru wo tsuge 
odoridasu sansai 
natsu wo miru uji 
nohara karakusa kawaku wa 
aki no tsuki 
nobotta manmarusa oiwai 
fuyu wo sugi 
mata tsukihi wo kazoeru

Haru wo tsuge 
odotte SANBA 
natsu wo miru uji 
nohara karakusa kawaku wa 
aki no tsuki 
nobotta manmarusa oiwai 
fuyu wo sugi 
mata tsukihi wo kazoeru

Mata yo ga akereba owakare 
yume wa tooki maboroshi ni 
anata wo oikaketeita hikari no naka de 
dakareru tabi 
atatakai kaze wo tayori",
    spotify_path: "https://open.spotify.com/embed/track/1iTvJFjCflwCz9RYJXzcsz?si=bbae276fd04a4de9",
    title: "Shiki No Uta"
)

slippin = Track.create(
    artist: "DMX", 
    artwork_path: "https://i.ytimg.com/vi/C1SjVKv86V8/hqdefault.jpg",  
    lyrics: 
"[Intro]
Ha ha ha ha ha ha, uhh
See, to live is to suffer
But to survive…
Well, that's to find meaning in the suffering

[Chorus]
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up

[Verse 1]
I've been through mad different phases like mazes to find my way
And now I know that happy days are not far away
If I'm strong enough I'll live long enough to see my kids
Doin' somethin' more constructive with their time than bids
I know because I been there, now I'm in there
Sit back and look at what it took for me to get there
First came the bullshit, the drama with my mama
She got on some fly shit so I split and said that I'ma
Be that seed that doesn't need much to succeed
Strapped with mad greed and a heart that doesn't bleed
I'm ready for the world or at least I thought I was
Baggin' niggas when I caught a buzz
For thinkin' about how short I was
Goin' too fast, it wouldn't last, but yo I couldn't tell
Group homes and institutions prepared my ass for jail
They put me in a situation forcin' me to be a man
When I was just learnin' to stand without a helping hand
Damn, was it my fault, somethin' I did
To make a father leave his first kid at seven doin' my first bid?
Back on the scene at fourteen with a scheme
To get more cream than I'd ever seen in a dream
And by all means I will be livin' high off the hog
And I never gave a fuck about much but my dog
That's my only mothafucka I hit off with my last
Just another lil nigga headed nowhere fast

[Chorus]
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up

[Verse 2]
That ain't the half, shit gets worse as I get older
Actions become bolder, heart got colder
Chip on my shoulder that I dared a nigga to touch
Didn't need a clique 'cause I scared a nigga that much
One deep with the pit startin' shit for kicks
Catchin' vics, throwin' bricks, gettin' by bein' slick
Used to get high, just to get by
Used to have to puff my L in the morning before I could fly
Ate somethin', a couple of forties made me hate somethin'
I did some coke, now I'm ready to take somethin'
Three years later showin' signs of stress
Didn't keep my hair cut or give a fuck how I dressed
I'm possessed by the darker side, livin' the cruddy life
Shit like this kept a nigga with a bloody knife
Wanna make records but I'm fuckin' it up
I'm slippin', I'm fallin', I can't get up

[Chorus]
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up

[Verse 3]
Wasn't long before I hit rock bottom
Niggas talkin' shit, was like, 'Damn, look how that rock got him!'
Open like a window, no more indo
Look at a video, sayin' to myself: 'That coulda been yo
Ass on the TV,' believe me, it could be done
Somethin's got to give, gots to change 'cause now I've got a son
I gots to do the right thing for shorty
And that means no more gettin' high, drinkin' 40s
So I get back lookin' type slick again
Fake niggas jump back on my dick again
Nothin' but love for those that know how it feel
And much respect to all my niggas that kept it real
Kept a nigga strong, kept a nigga from doin' wrong
Niggas know who they is and this is your fuckin' song
And to my boo who stuck with a nigga through
All the bullshit, you'll get yours because it's due

[Chorus]
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I can't get up
Ayo I'm slippin', I'm fallin', I gots to get up
Get me back on my feet so I can tear shit up",
    spotify_path: "https://open.spotify.com/embed/track/740gNyGWKk98gy8nJLhHrv?si=fe8ddd13ae584d45",
    title: "Slippin'"
)

selene_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She is singing about Selene, her alter-ego, who comes out when she becomes under the influence. She is claiming Selene is making her do things not of her own will but she is not trying to will herself against Selene.",
    end_index: 140,
    start_index: 9,
    track_id: selene.id
)
selene_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She is allowing Selene to take over. She and Selene want the same thing.",
    end_index: 516,
    start_index: 459,
    track_id: selene.id
)
selene_annotation3 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "Selene is the Greek goddess of the moon and her symbols include the torch and the chariot. It is said that she drives her chariot  across the heavens carrying her torch. She is saying that when Selene takes over her, everyone will notice it as if the Greek goddess arrived.",
    end_index: 1049,
    start_index: 778,
    track_id: selene.id
)

selene_comment1 = Comment.create(
    body: "This is one of my new favorite songs now.",
    commentable_id: selene.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)
selene_comment2 = Comment.create(
    body: "OOOOOHHHHHHH! Now I get it.",
    commentable_id: selene_annotation1.id,
    commentable_type: "Annotation",
    commenter_id: notsosmart.id
)
selene_comment3 = Comment.create(
    body: "I wonder what these lyrics mean.",
    commentable_id: selene.id,
    commentable_type: "Track",
    commenter_id: notsosmart.id
)

selene_vote1 = Vote.create(
    voteable_id: selene_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote2 = Vote.create(
    voteable_id: selene_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote3 = Vote.create(
    voteable_id: selene_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote4 = Vote.create(
    voteable_id: selene_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote5 = Vote.create(
    voteable_id: selene_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote6 = Vote.create(
    voteable_id: selene_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)
selene_vote7 = Vote.create(
    voteable_id: selene_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)
selene_vote8 = Vote.create(
    voteable_id: selene_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)
selene_vote9 = Vote.create(
    voteable_id: selene_annotation2.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote10 = Vote.create(
    voteable_id: selene_annotation2.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote11 = Vote.create(
    voteable_id: selene_annotation2.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote12 = Vote.create(
    voteable_id: selene_annotation2.id,
    voteable_type: "Annotation",
    voter_id: 2
)
selene_vote13 = Vote.create(
    voteable_id: selene_annotation2.id,
    voteable_type: "Annotation",
    voter_id: 2
)

selene_tag1 = Tag.create(
    name: "Selene",
    track_id: selene.id
)
selene_tag2 = Tag.create(
    name: "Niki",
    track_id: selene.id
)
selene_tag3 = Tag.create(
    name: "Pop",
    track_id: selene.id
)

lady_annotation1= Annotation.create(
    annotator_id: reallysmart.id,
    body: "The person is conveying to the woman whom he is with is the person he is finally meant to be with. He also knows by how the woman is reacting to him.",
    end_index: 279,
    start_index: 0,
    track_id: lady.id
)

lady_comment1 = Comment.create(
    body: "This is one of my new favorite songs now.",
    commentable_id: lady.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

lady_vote1 = Vote.create(
    voteable_id: lady_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
lady_vote2 = Vote.create(
    voteable_id: lady_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
lady_vote3 = Vote.create(
    voteable_id: lady_annotation1.id,
    voteable_type: "Annotation",
    voter_id: 2
)
lady_vote4 = Vote.create(
    voteable_id: lady_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)
lady_vote5 = Vote.create(
    voteable_id: lady_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)
lady_vote6 = Vote.create(
    voteable_id: lady_comment1.id,
    voteable_type: "Comment",
    voter_id: 2
)

lady_tag1 = Tag.create(
    name: "Lady",
    track_id: lady.id
)
lady_tag2 = Tag.create(
    name: "Modjo",
    track_id: lady.id
)
lady_tag3 = Tag.create(
    name: "Dance",
    track_id: lady.id
)

fake_love_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He had been at a low place in his life for so long that any affection he had received when he became successful felt real but realizes they were not genuine.",
    end_index: 162,
    start_index: 8,
    track_id: fake_love.id
)
fake_love_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He senses that whenever he talks to his friend that the friend is always hiding something.",
    end_index: 465,
    start_index: 327,
    track_id: fake_love.id
)
fake_love_annotation3 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "Now that he experienced all the fake affection and the ways people tried to use him, he is immediately able to see the deception of those around him.",
    end_index: 1473,
    start_index: 1277,
    track_id: fake_love.id
)

fake_love_comment1 = Comment.create(
    body: "This song really grew on me and I would say it's my favorite song ever.",
    commentable_id: fake_love.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)
fake_love_comment2 = Comment.create(
    body: "I see.",
    commentable_id: fake_love_annotation1.id,
    commentable_type: "Annotation",
    commenter_id: notsosmart.id
)

fake_love_vote1 = Vote.create(
    voteable_id: fake_love_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
fake_love_vote2 = Vote.create(
    voteable_id: fake_love_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
fake_love_vote3 = Vote.create(
    voteable_id: fake_love_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
fake_love_vote4 = Vote.create(
    voteable_id: fake_love_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
fake_love_vote5 = Vote.create(
    voteable_id: fake_love_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

fake_love_tag1 = Tag.create(
    name: "Drake",
    track_id: fake_love.id
)
fake_love_tag2 = Tag.create(
    name: "Fake Love",
    track_id: fake_love.id
)
fake_love_tag3 = Tag.create(
    name: "R&B",
    track_id: fake_love.id
)

river_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "This is a sexual innuendo.",
    end_index: 138,
    start_index: 98,
    track_id: river.id
)
river_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She says love for someone else can be the deepest feeling anyone feels but at the same time, that love can be the most fragile.",
    end_index: 261,
    start_index: 149,
    track_id: river.id
)
river_annotation3 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She is saying that if he says anything, then the relationship will break. So, she just tells him to perform on her.",
    end_index: 410,
    start_index: 275,
    track_id: river.id
)

river_comment1 = Comment.create(
    body: "The beat just fires me up.",
    commentable_id: river.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

river_vote1 = Vote.create(
    voteable_id: river_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
river_vote2 = Vote.create(
    voteable_id: river_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
river_vote3 = Vote.create(
    voteable_id: river_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
river_vote4 = Vote.create(
    voteable_id: river_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
river_vote5 = Vote.create(
    voteable_id: river_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
river_vote6 = Vote.create(
    voteable_id: river_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
river_vote7 = Vote.create(
    voteable_id: river_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
river_vote8 = Vote.create(
    voteable_id: river_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

river_tag1 = Tag.create(
    name: "River",
    track_id: river.id
)
river_tag2 = Tag.create(
    name: "Bishop Briggs",
    track_id: river.id
)
river_tag3 = Tag.create(
    name: "Pop",
    track_id: river.id
)

reflection_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She wants to know why she does not see her true self.",
    end_index: 436,
    start_index: 344,
    track_id: reflection.id
)

reflection_comment1 = Comment.create(
    body: "This gets me in the feels all the time.",
    commentable_id: reflection.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

reflection_vote1 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote2 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote3 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote4 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote5 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote6 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote7 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote8 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote9 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
reflection_vote10 = Vote.create(
    voteable_id: reflection_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)

reflection_tag1 = Tag.create(
    name: "Reflection",
    track_id: reflection.id
)
reflection_tag2 = Tag.create(
    name: "Lea Salonga",
    track_id: reflection.id
)
reflection_tag3 = Tag.create(
    name: "Pop",
    track_id: reflection.id
)

stay_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He feels like his body is breaking down just at the though of separating from the woman he is in love with.",
    end_index: 377,
    start_index: 120,
    track_id: stay.id
)
stay_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He is willing to change and do anything just so the woman he loves would stay with him.",
    end_index: 1143,
    start_index: 1035,
    track_id: stay.id
)

stay_comment1 = Comment.create(
    body: "I never listened to this a lot when I was younger but this was such a banger.",
    commentable_id: stay.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

stay_vote1 = Vote.create(
    voteable_id: stay_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
stay_vote2 = Vote.create(
    voteable_id: stay_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
stay_vote3 = Vote.create(
    voteable_id: stay_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
stay_vote4 = Vote.create(
    voteable_id: stay_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

stay_tag1 = Tag.create(
    name: "Stay",
    track_id: stay.id
)
stay_tag2 = Tag.create(
    name: "Ne-Yo",
    track_id: stay.id
)
stay_tag3 = Tag.create(
    name: "R&B",
    track_id: stay.id
)

just_a_friend_2002_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He wants to know everything about the girl that he is into, even if the girl has a boyfriend. He ultimately wants to be together with her but she continues to keep him in the friend zone.",
    end_index: 324,
    start_index: 36,
    track_id: just_a_friend_2002.id
)
just_a_friend_2002_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He wants to know everything about the girl he is talking with because he is obsessed with being with her. However, the girl is rebuffing his advancements by telling him that he is 'just a friend.'",
    end_index: 905,
    start_index: 623,
    track_id: just_a_friend_2002.id
)

just_a_friend_2002_comment1 = Comment.create(
    body: "This is one catchy song!",
    commentable_id: just_a_friend_2002.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)
just_a_friend_2002_comment2 = Comment.create(
    body: "I can relate!",
    commentable_id: just_a_friend_2002_annotation1.id,
    commentable_type: "Annotation",
    commenter_id: reallysmart.id
)

just_a_friend_2002_vote1 = Vote.create(
    voteable_id: just_a_friend_2002_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
just_a_friend_2002_vote2 = Vote.create(
    voteable_id: just_a_friend_2002_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
just_a_friend_2002_vote3 = Vote.create(
    voteable_id: just_a_friend_2002_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
just_a_friend_2002_vote4 = Vote.create(
    voteable_id: just_a_friend_2002_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
just_a_friend_2002_vote5 = Vote.create(
    voteable_id: just_a_friend_2002_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
just_a_friend_2002_vote6 = Vote.create(
    voteable_id: just_a_friend_2002_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

just_a_friend_2002_tag1 = Tag.create(
    name: "Just a Friend 2002",
    track_id: just_a_friend_2002.id
)
just_a_friend_2002_tag2 = Tag.create(
    name: "Mario",
    track_id: just_a_friend_2002.id
)
just_a_friend_2002_tag3 = Tag.create(
    name: "R&B",
    track_id: just_a_friend_2002.id
)

revenge_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She says she will never allow the person to be in her life again but also felt disappointed because she genuinely cared for him.",
    end_index: 246,
    start_index: 135,
    track_id: revenge.id
)
revenge_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She vows to the person she gave her love to will regret everything he did once she becomes as successful as much as she believes she would be.",
    end_index: 752,
    start_index: 434,
    track_id: revenge.id
)
revenge_annotation3 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "She reiterates that she used to be in love with him. But, she no longer cares that he starts to want to be with her again after she became more successful.",
    end_index: 998,
    start_index: 763,
    track_id: revenge.id
)

revenge_comment1 = Comment.create(
    body: "I am on her side!",
    commentable_id: revenge.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

revenge_vote1 = Vote.create(
    voteable_id: revenge_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote2 = Vote.create(
    voteable_id: revenge_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote3 = Vote.create(
    voteable_id: revenge_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote4 = Vote.create(
    voteable_id: revenge_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote5 = Vote.create(
    voteable_id: revenge_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote6 = Vote.create(
    voteable_id: revenge_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
revenge_vote7 = Vote.create(
    voteable_id: revenge_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
revenge_vote8 = Vote.create(
    voteable_id: revenge_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
revenge_vote9 = Vote.create(
    voteable_id: revenge_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
revenge_vote10 = Vote.create(
    voteable_id: revenge_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

revenge_tag1 = Tag.create(
    name: "Revenge",
    track_id: revenge.id
)
revenge_tag2 = Tag.create(
    name: "Tiffany Day",
    track_id: revenge.id
)
revenge_tag3 = Tag.create(
    name: "Pop",
    track_id: revenge.id
)

blue_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He says the sky is blue, you are next to him, the sea is blue, and it's hot.",
    end_index: 303,
    start_index: 23,
    track_id: blue.id
)
blue_annotation2 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "He says that the summer is ours and that if there is an angel then it is you so let's get lost in the sky.",
    end_index: 685,
    start_index: 597,
    track_id: blue.id
)

blue_comment1 = Comment.create(
    body: "This is a summer banger!",
    commentable_id: blue.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

blue_vote1 = Vote.create(
    voteable_id: blue_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote2 = Vote.create(
    voteable_id: blue_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote3 = Vote.create(
    voteable_id: blue_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote4 = Vote.create(
    voteable_id: blue_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote5 = Vote.create(
    voteable_id: blue_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote6 = Vote.create(
    voteable_id: blue_annotation2.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
blue_vote7 = Vote.create(
    voteable_id: blue_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
blue_vote8 = Vote.create(
    voteable_id: blue_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
blue_vote9 = Vote.create(
    voteable_id: blue_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
blue_vote10 = Vote.create(
    voteable_id: blue_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

blue_tag1 = Tag.create(
    name: "Blue",
    track_id: blue.id
)
blue_tag2 = Tag.create(
    name: "Dynamic Duo",
    track_id: blue.id
)
blue_tag3 = Tag.create(
    name: "Hip Hop",
    track_id: blue.id
)
blue_tag4 = Tag.create(
    name: "Rap",
    track_id: blue.id
)

shiki_no_uta_annotation1 = Annotation.create(
    annotator_id: reallysmart.id,
    body: "When dawn breaks again, we'll say our farewells. Our dreams become distant phantoms. The times we were embraced. In the light that chased you, relying on the warm winds.",
    end_index: 133,
    start_index: 0,
    track_id: shiki_no_uta.id
)

shiki_no_uta_comment1 = Comment.create(
    body: "Best anime ending.",
    commentable_id: shiki_no_uta.id,
    commentable_type: "Track",
    commenter_id: reallysmart.id
)

shiki_no_uta_vote1 = Vote.create(
    voteable_id: shiki_no_uta_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
shiki_no_uta_vote2 = Vote.create(
    voteable_id: shiki_no_uta_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
shiki_no_uta_vote3= Vote.create(
    voteable_id: shiki_no_uta_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
shiki_no_uta_vote4 = Vote.create(
    voteable_id: shiki_no_uta_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
shiki_no_uta_vote5 = Vote.create(
    voteable_id: shiki_no_uta_annotation1.id,
    voteable_type: "Annotation",
    voter_id: notsosmart.id
)
shiki_no_uta_vote6 = Vote.create(
    voteable_id: shiki_no_uta_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
shiki_no_uta_vote7 = Vote.create(
    voteable_id: shiki_no_uta_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
shiki_no_uta_vote8 = Vote.create(
    voteable_id: shiki_no_uta_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
shiki_no_uta_vote9 = Vote.create(
    voteable_id: shiki_no_uta_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)
shiki_no_uta_vote10 = Vote.create(
    voteable_id: shiki_no_uta_comment1.id,
    voteable_type: "Comment",
    voter_id: notsosmart.id
)

shiki_no_uta_tag1 = Tag.create(
    name: "Shiki No Uta",
    track_id: shiki_no_uta.id
)
shiki_no_uta_tag2 = Tag.create(
    name: "Nujabes",
    track_id: shiki_no_uta.id
)
shiki_no_uta_tag3 = Tag.create(
    name: "Hip Hop",
    track_id: shiki_no_uta.id
)

slippin_tag1 = Tag.create(
    name: "Slippin'",
    track_id: slippin.id
)
slippin_tag2 = Tag.create(
    name: "DMX",
    track_id: slippin.id
)
slippin_tag3 = Tag.create(
    name: "Rap",
    track_id: slippin.id
)
slippin_tag4 = Tag.create(
    name: "Hip Hop",
    track_id: slippin.id
)