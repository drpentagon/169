class LevelData {
    constructor() {
        this.levels = [       
            {                
                data: {
                    name:"Nil",
                    background:"rgb(0,0,0)",
                    timeout:20,
                    bounceLimit:4, 
                    redirectorLimit:2,                     
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],                
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                ],
                balls: [
                    {x:2, y:4, dx:2, dy:0},
                ],
            },
            {
                data: {
                    name:"Second peng",
                    background:"rgb(0,0,0)",
                    timeout:20,
                    bounceLimit:4, 
                    redirectorLimit:2, 
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],                
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                ],
                balls: [
                    {x:2, y:9, dx:4, dy:0},
                ],
            },   
            {
                data: {
                    name:"perlence",
                    background:"rgb(0,0,0)",
                    timeout:45,
                    bounceLimit:20, 
                    redirectorLimit:12, 
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],                
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                ],
                balls: [
                    {x:1, y:8, dx:6, dy:0},
                    {x:2, y:9, dx:5, dy:0},
                    {x:3, y:10, dx:4, dy:0},
                    {x:4, y:11, dx:3, dy:0},
                ],
            },
            {
                data: {
                    name:"444",
                    background:"rgb(0,0,0)",
                    timeout:80,
                    bounceLimit:200, 
                    redirectorLimit:24,      
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],
                walls:[
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                ],
                balls: [
                    {x:4, y:1, dx:0, dy:5},                
                    {x:9, y:2, dx:-3, dy:0},
                    {x:2, y:3, dx:5, dy:0},                    
                    {x:1, y:4, dx:0, dy:-4},                                        
                    {x:11, y:5, dx:0, dy:5},                                                            
                    {x:3, y:6, dx:-5, dy:0},
                    {x:8, y:7, dx:0, dy:-2},
                    {x:6, y:8, dx:0, dy:4},
                    {x:3, y:9, dx:4, dy:0},
                    {x:10, y:10, dx:-3, dy:0},                    
                    {x:5, y:11, dx:0, dy:5},                                        
                ]
            },            
            {
                data: {
                    name:"maphive 6.1",
                    background:"rgb(0,0,0)",
                    timeout:75,
                    bounceLimit:110, 
                    redirectorLimit:40, 
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],                
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                    {block:[[8,4],[8,6]]},
                    {block:[[4,4],[7,4]]},
                    {block:[[4,5],[4,8]]},
                    {block:[[5,8],[10,8]]},
                    {block:[[10,2],[10,7]]},
                    {block:[[2,2],[9,2]]},
                    {block:[[2,3],[2,10]]},
                    {block:[[3,10],[11,10]]},
                ],
                balls: [
                    {x:6, y:9, dx:4, dy:0},
                    {x:6, y:11, dx:4, dy:0},
                    {x:6, y:1, dx:4, dy:0},
                    {x:6, y:3, dx:4, dy:0},
                ],
            },              
            {
                data: {                
                    name:"drane",
                    background:"rgb(0,0,0)",
                    timeout:50,
                    bounceLimit:80,
                    redirectorLimit:14, 
                },
                goals: [
                    {x:6, y:6, rotates:true},
                ],
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,11]]},
                    {block:[[12,1],[12,11]]},
                    {points:[[1,4], [3,4], [5,4], [7,4], [9,4], [11,4],
                        [5,5], [7,5], [5, 7], [7,7],
                        [4,1], [4,3], [4,4], [4,5], [4,7], [4,8], [4,9], [4,11],
                        [8,1], [8,3], [8,4], [8,5], [8,7], [8,8], [8,9], [8,11],
                        [1,8], [3,8], [5,8], [7,8], [9,8], [11,8]]},
                ],
                balls: [
                    {x:11, y:3, dx:3, dy:0},
                    {x:11, y:11, dx:0, dy:3},
                    {x:1, y:11, dx:6, dy:0},
                    {x:2, y:2, dx:0, dy:4},
                    {x:8, y:6, dx:-3, dy:0},
                    ],
            },   
            {                
                data: {
                    name:"notwo",
                    background:"rgb(0,0,0)",
                    timeout:100,
                    bounceLimit:40, 
                    redirectorLimit:25,                     
                },
                goals: [
                    {x:1, y:12, rotates:true},
                    {x:3, y:12, rotates:true},
                    {x:5, y:12, rotates:true},
                    {x:7, y:12, rotates:true},
                    {x:9, y:12, rotates:true},
                    {x:11, y:12, rotates:true},
                ],                
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,1],[0,12]]},
                    {block:[[12,1],[12,12]]},
                    {block:[[2,2],[11,2]]},
                    {block:[[2,4],[2,12]]},
                    {block:[[3,4],[10,4]]},
                    {block:[[10,6],[10,12]]},
                    {block:[[4,6],[9,6]]},
                    {block:[[4,8],[4,12]]},
                    {block:[[5,8],[8,8]]},
                    {block:[[8,10],[8,12]]},
                    {block:[[6,10],[7,10]]},
                    {points:[[6,12]]},
                ],
                balls: [
                    {x:3, y:1, dx:-2, dy:0},
                    {x:7, y:1, dx:3, dy:0},
                    {x:1, y:1, dx:-4, dy:0},
                    {x:5, y:1, dx:5, dy:0},
                    {x:9, y:1, dx:-6, dy:0},
                    {x:11, y:1, dx:7, dy:0},
                ],
            },        
            {
                data: {
                    name: "Glitch",
                    background:"rgb(0,0,0)",
                    timeout:80,
                    bounceLimit:4, 
                    redirectorLimit:2,                     
                },
                goals: [
                    {x:6, y:6, rotates:false},
                ],
                walls: [
                    {block:[[0,0],[0,12]]},
                    {block:[[12,0],[12,12]]},
                    {block:[[1,6],[5,6]]},
                    {block:[[7,6],[11,6]]},
                    {block:[[2,8],[10,8]]},
                    {block:[[2,10],[2,12]]},
                    {block:[[10,10],[10,12]]},
                    {block:[[3,12],[9,12]]},
                    {block:[[4,10],[8,10]]},

                    {block:[[2,4],[10,4]]},
                    {block:[[2,0],[2,2]]},
                    {block:[[10,0],[10,2]]},
                    {block:[[3,0],[9,0]]},
                ],
                balls: [
                    {x:2, y:7, dx:5, dy:0},
                    {x:2, y:5, dx:5, dy:0},
                    {x:8, y:1, dx:3, dy:0},
                    {x:8, y:11, dx:3, dy:0},
                ]
            },   
            {                
                data: {
                    name:"Teartear",
                    background:"rgb(0,0,0)",
                    timeout:90,
                    bounceLimit:200, 
                    redirectorLimit:35,                     
                },
                goals: [
                    {x:6, y:3, rotates:false},
                ],                
                walls: [
                    {block:[[2,0],[5,0]]},
                    {block:[[7,0],[12,0]]},
                    {block:[[2,12],[5,12]]},
                    {block:[[7,12],[12,12]]},
                    {block:[[0,2],[0,10]]},
                    {block:[[12,2],[12,10]]},
                    {block:[[1,2],[3,2]]},
                    {block:[[9,2],[11,2]]},
                    {block:[[1,10],[3,10]]},
                    {block:[[9,10],[11,10]]},
                    {block:[[4,4],[4,8]]},
                    {block:[[5,1],[5,4]]},
                    {block:[[5,8],[5,11]]},
                    {block:[[7,1],[7,4]]},
                    {block:[[7,8],[7,11]]},
                    {block:[[8,6],[8,8]]},
                    {block:[[1,6],[3,6]]},
                    {block:[[9,6],[11,6]]},
                    {points:[[0,0], [0,12], [6,4], [8,4]]},
                ],
                balls: [
                    {x:6, y:6, dx:4, dy:0},
                    {x:2, y:4, dx:0, dy:-4},
                    {x:2, y:8, dx:0, dy:4},
                    {x:10, y:4, dx:0, dy:4},
                    {x:10, y:8, dx:0, dy:-4},
                ],
            },                       
            {
                data: {
                    name:"Fold4. Wrap5",
                    timeout: 90,
                    bounceLimit: 100,
                    redirectorLimit: 6,
                },
                goals: [
                    {x:9, y:3, rotates:true},        
                ],
                walls: [
                    {block:[[0,6],[8,7]]},
                    {block:[[10,6],[12,7]]},
                    {block:[[5,0],[6,2]]},
                    {block:[[5,4],[6,12]]},
                    {block:[[8,0],[8,2]]},
                    {block:[[8,4],[8,4]]},
                    {block:[[10,0],[12,2]]},
                    {block:[[10,4],[12,4]]},
                    {block:[[10,4],[12,4]]},
                    {block:[[8,9],[8,12]]},
                    {block:[[0,4],[3,4]]},
                ],
                balls: [
                    {x:4, y:4, dx:0, dy:5},
                    {x:7, y:9, dx:0, dy:5},
                    {x:4, y:9, dx:0, dy:5},
                    {x:7, y:4, dx:0, dy:5},
                ],
                redirectors: [
                    {x:4, y:5, type:3, static:true},
                    {x:7, y:5, type:0, static:true},
                    {x:7, y:8, type:1, static:true},
                    {x:4, y:8, type:2, static:true},

                    {x:9, y:12, type:1, static:true},
                    {x:10, y:10, type:0, static:true},
                    {x:11, y:9, type:0, static:true},
                    {x:9, y:11, type:0, static:true},
                    {x:0, y:12, type:2, static:true},
                    {x:1, y:11, type:2, static:true},
                    {x:2, y:10, type:2, static:true},
                    {x:3, y:9, type:2, static:true},
                    {x:0, y:2, type:0, static:true},
                    {x:3, y:3, type:0, static:true},
                    {x:1, y:1, type:0, static:true},
                    {x:2, y:3, type:3, static:true},
                ], 
            }, 

        ];

        console.log(this.levels.length)
    }

    getLevel(id_) {
        return this.levels[id_];
    }
}

export default LevelData;


/*
Fermium
Foil
Piezo
Yulquen
Clipper
Rsdio
Acroyear2
Rae
Under BOAC
Arch Carrier
Sim Gishel
Parhelic Triangle
Lentic Catachresis
6IE.CR
Surripere
ipacial section
chenc9
known(1)
d-sho qub
Basscadet
Djarum
Second bad vilbel
pencha
krib
rpeg
outpt
liccflii
netlon sentinel
cap.iv
rew(1)
M62

Amber
    Anti EP
    Anvil Vapre
    Basscad EP
Cichlisuite
confield
draft 7.30
    envane
    ep7
    gantz graf
incunabula
lp5
move of ten
oversteps
quaristice
tri repetae
untilted


Garbagemx36



3hae
6852
6Ie.cr
Accelera 1 & 2

Aeo3
Altibzz
Arch Carrier
Are Y Are We?
Augmatic Disport

Autriche
Basscadet
Bike
Bine
Biographie
bladelores
Blifil
Blyz Castl
bnc Castl
Breezeblock 2003-03-31
Bronchus 2
Bronchusevenmx
Bronchusevenmx24
C-Pach
Calbruc
Caliper Remote
Cap.IV
Cavity Job
Ccec
Cep puiqMX
Cfern
Characi
chenc9
chenc9-1dub
chenc9-x
Cichli
Cipater
Clipper
cloudline
Corc
d-sho qub
Dael
deco Loc
Dial.
Djarum
Doctrine
Drane
Drane2
Draun Quarter
Dropp
Eggshell
Eidetic Casein
Etchogon-S
Eutow
Exclusive Traks
Fermium
Flep
FLeure
Flutter
Foil
Fol3
fol4
Fold4, Wrap5
Further
fwzE
Gaekwad
Gantz Graf
Garbagemx
Garbagemx36
Gelk
Glitch
Gnit
Goz Quarter
Helter Skelter Radio Show
Hub
Iera
ilanders
Inhake 2
Interview
IO
Ipacial Section
iris was a pupil
irlite (get 0)
IV VV IV VV VIII
jatevee C
Kalpol Intro
Kalpol Introl
known(1)
Krib
krYlon
Latent Quarter
Laughing Quarter
Lcc
Left Blank
Lentic Catachresis
Leterel
LiccflII
Lost
Lowride
M39 Diffain
M62
Maetl
Maphive 6.1
Maphive6.1
McR Quarter (Bonus)
MCR Quarter (live)
Melve
Milk D X
Milk DX
Montreal
Netlon Sentinel
newbound
Nil
Nine
no border
nodezsh
nofour.x
Notwo
notwotwo
nth Dafuseder.b
nu-Nr6d
Nuane
O=0
os veix3
Osla for n
Outh9X
Outpt
Outpt # Dropp
Overand
P.ntil
paralel Suns
Parhelic Triangle
pce freeze 2.8i
Pen Expers
Pencha
Perlence
Perlence losid 2
Perlence range 7
Perlence subrange 3
Perlence subrange 6-36
Perlence Suns
Phylopn
Piezo
PIOBmx
Piobmx19
Pir
plyPhon
prac-f
Pro Radii
pt2ph8
Pule
qplay
r ess
Radio
Radio Mix
Rae
rale
range3
recks on
Recury
redfall
Reniform Puls
Rettic Ac
rew(1)
Rotar
Rpeg
Rsdio
runrepik
Second Bad Vilbel
Second Peng
Second Scepe
Second Scout
see on see
Silverside
Sim Gishel
Simmm
Slip
SonDEre-ix
SonDEremawe
Spangle
spl9
Squeller
st epreo
Steels
Stud
Sublimit
Surripere
T ess xi
tac Lacora
Tankakern
Tankraken
Tapr
Teartear
Tewe
The Plc
The Plc ccc
The Trees
Theme Of A Sudden Roundabout
Theme of Sudden Roundabout
ThePlclCpC
Theswere
Tilapia
Tkakanren
Treale
tuinorizn
Under Boac
Untitled
Uviol
V-Proc
vekoS
Vi Scose Poise
Vl Al 5
VLetrmx
Vletrmx21
Vose In
We R Are Why
Windwind
WNSN
Xektses sql
Xylin Room
y7
Yeesland
YJY UX
ylm0
Yulquen
Yuop
Zeiss Contarex
Zurich 2001
Kalpol Introl


*/