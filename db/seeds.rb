# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Track.destroy_all
Annotation.destroy_all
Comment.destroy_all

reallysmart = User.create(
    username: 'reallysmart', 
    password: 'reallysmart'
)

notsosmart = User.create(
    username: 'notsosmart',
    password: 'notsosmart'
)

lady = Track.create(
    title: 'Lady', 
    artist: 'Modjo', 
    artwork_path: 'https://i.ytimg.com/vi/Z0V4CtdXlhk/maxresdefault.jpg', 
    lyrics: 
"[Chorus]
Lady, hear me tonight
'Cause my feeling, is just so right
As we dance, by the moonlight
Can't you see, you're my delight
Lady, I just feel like
I won't get you, out of my mind
I feel love, for the first time
And I know that it's true, I can tell by the look in your eyes

[Chorus]
Lady, hear me tonight
'Cause my feeling, is just so right
As we dance, by the moonlight
Can't you see, you're my delight
Lady, I just feel like
I won't get you, out of my mind
I feel love, for the first time
And I know that it's true, I can tell by the look in your eyes

[Breakdown Chorus]
Lady, hear me tonight
'Cause my feeling, is just so right
As we dance, by the moonlight
Can't you see, you're my delight
Lady, I just feel like
I won't get you, out of my mind
I feel love, for the first time
And I know that it's true, I can tell by the look in your eyes

[Verse 1]
Lady (Lady)
Hear me tonight (Hear me tonight)
'Cause my feeling ('Cause my feeling)
Is just so right (Is just so right)

[Verse 2]
Lady (Lady)
I just feel like (I just feel like)
I feel love (I feel love)
For the first time (For the first time)

[Verse 3]
Lady (Lady)
Hear me tonight (Hear me tonight)
Can't you see (Can't you see)
You're my delight (You're my delight)

[Verse 4]
Lady (Lady)
I just feel like (I just feel like)
I won't get you (I won't get you)
Out of my mind (Out of my mind)

[Verse 1]
Lady (Lady)
Hear me tonight (Hear me tonight)
'Cause my feeling ('Cause my feeling)
Is just so right (Is just so right)"
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

river = Track.create(
    title: 'River', 
    artist: 'Bishop Briggs', 
    artwork_path: 'https://images.genius.com/2f7cccb4dfe4cd619758a9d436faa5eb.1000x1000x1.png', 
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
Shut your mouth and run me like a river"
)

reflection = Track.create(
    title: 'Reflection', 
    artist: 'Lea Salonga', 
    artwork_path: 'https://i.ytimg.com/vi/RxUmbraYDcE/hqdefault.jpg', 
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
When will my reflection show who I am inside?"
)

stay = Track.create(
    title: 'Stay', 
    artist: 'Ne-Yo', 
    artwork_path: 'https://images-na.ssl-images-amazon.com/images/I/516J-AHuqOL._SY355_.jpg', 
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
Stay with me"
)

just_a_friend_2002 = Track.create(
    title: 'Just a Friend 2002', 
    artist: 'Mario', 
    artwork_path: 'https://images-na.ssl-images-amazon.com/images/I/81YWIIhIlnL.jpg', 
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
But you say I'm just a friend"
)

revenge = Track.create(
    title: 'Revenge', 
    artist: 'Tiffany Day', 
    artwork_path: 'https://i1.sndcdn.com/artworks-gmFbAzVcPDjVJgzn-87w1Eg-t500x500.jpg', 
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
Im not foolish, I've been trough this and I don't want to pretend that you were allowed with it all from the start
I know you've been fakin', it don't work too hard anymore
A heartbreaker, you can't take it, and I will get my revenge, yeah yeah"
)

blue = Track.create(
    title: 'Blue', 
    artist: 'Dynamic Duo', 
    artwork_path: 'https://popgasa1.files.wordpress.com/2019/08/3290161.jpg', 
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
넌 쉬고 놀기만 해 go play"
)

dirty_water = Track.create(
    title: 'Dirty Water', 
    artist: 'The Standells', 
    artwork_path: 'https://www.culturesonar.com/wp-content/uploads/2020/02/standells-dirty-water-album.jpg', 
    lyrics: 
"I'm gonna tell you a story
I'm gonna tell you about my town
I'm gonna tell you a big bad story, baby
Aww, it's all about my town

Yeah, down by the river
Down by the banks of the river Charles (aw, that's what's happenin' baby)
That's where you'll find me
Along with lovers, muggers, and thieves (aw, but they're cool, too)
Well I love that dirty water
Oh, Boston, you're my home (oh, you're the Number One place)
Frustrated women (I mean they're frustrated)
Have to be in by twelve o'clock (oh, that's a shame)
But I'm wishin' and a-hopin, oh
That just once those doors weren't locked (I like to save time for
My baby to walk around)
Well I love that dirty water
Oh, Boston, you're my home (oh, yeah)

Because I love that dirty water
Oh, oh, Boston, you're my home (oh, yeah)

Well, I love that dirty water (I love it, baby)
I love that dirty water (I love Baw-stun)
I love that dirty water (Have you heard about the Strangler?)
I love that dirty water (I'm the man, I'm the man)
I love that dirty water (Owww!)
I love that dirty water (Come on, come on)"
)

annotation1 = Annotation.create(
    body: "He is saying that this summer is ours. He says that if there is an angel near then it's you and he wants to get lost in the sky with you.",
    annotator_id: reallysmart.id,
    track_id: blue.id,
    start_index: 597,
    end_index: 685,
)

comment1 = Comment.create(
    body: "대박!!! This is fire!",
    commenter_id: reallysmart.id,
    commentable_type: "Track",
    commentable_id: blue.id
)

comment2 = Comment.create(
    body: "OOOOOHHHHHHH! Now I get it.",
    commenter_id: notsosmart.id,
    commentable_type: "Annotation",
    commentable_id: annotation1.id
)