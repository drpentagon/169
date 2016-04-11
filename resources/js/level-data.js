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
                    name:"drane",
                    background:"rgb(0,0,0)",
                    timeout:50,
                    bounceLimit:100,
                    redirectorLimit:15, 
                },
                goals: [
                    {x:6, y:6, rotates:true},
                ],
                walls: [
                    {block:[[0,0],[12,0]]},
                    {block:[[0,12],[12,12]]},
                    {block:[[0,1],[0,5]]},
                    {block:[[12,1],[12,5]]},
                    {block:[[0,7],[0,11]]},
                    {block:[[12,7],[12,11]]},
                    {points:[[1,4], [3,4], [5,4], [7,4], [9,4], [11,4],
                        [5,5], [7,5], [5, 7], [7,7],
                        [4,1], [4,3], [4,4], [4,5], [4,7], [4,8], [4,9], [4,11],
                        [8,1], [8,3], [8,4], [8,5], [8,7], [8,8], [8,9], [8,11],
                        [1,8], [3,8], [5,8], [7,8], [9,8], [11,8]]},
                ],
                redirectors: [
                    {x:10, y:2, type:2, static:true},
                    {x:10, y:6, type:0, static:true},
                    {x:2, y:6, type:2, static:true},
                    {x:2, y:10, type:0, static:true},
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
                    name:"Fold4,Wrap5",
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
                    {block:[[8,1],[8,2]]},
                    {block:[[8,4],[8,4]]},
                    {block:[[10,1],[11,2]]},
                    {block:[[10,4],[11,4]]},
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
        ]
    }

    getLevel(id_) {
        return this.levels[id_];
    }
}

export default LevelData;


/*
Fermium
444
Foil
Glitch
Piezo
Yulquen
Teartear
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
perlence
notwo
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
maphive 6.1
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