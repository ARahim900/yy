// data/water.ts

const waterCsvData = `Meter Label,Acct #,Label,Zone,Parent Meter,Type,Jan-25,Feb-25,Mar-25,Apr-25,May-25,Jun-25,Jul-25
Irrigation Tank 04 - (Z08),4300294,DC,Direct Connection,Main Bulk (NAMA),IRR_Servies,0,0,0,0,0,0,1
Building (Security),4300297,DC,Direct Connection,Main Bulk (NAMA),MB_Common,17,18,13,16,16,13,19
Building (ROP),4300299,DC,Direct Connection,Main Bulk (NAMA),MB_Common,23,21,19,20,20,17,22
Irrigation Tank 01 (Inlet),4300323,DC,Direct Connection,Main Bulk (NAMA),IRR_Servies,0,0,0,0,2,0,1
Hotel Main Building,4300334,DC,Direct Connection,Main Bulk (NAMA),Retail,18048,19482,22151,27676,26963,17379,14713
"Community Mgmt - Technical Zone, STP",4300336,DC,Direct Connection,Main Bulk (NAMA),MB_Common,29,37,25,35,29,53,50
"PHASE 02, MAIN ENTRANCE (Infrastructure)",4300338,DC,Direct Connection,Main Bulk (NAMA),MB_Common,11,8,6,7,6,6,7
Irrigation- Controller UP,4300340,DC,Direct Connection,Main Bulk (NAMA),IRR_Servies,0,0,0,1000,313,491,554
Irrigation- Controller DOWN,4300341,DC,Direct Connection,Main Bulk (NAMA),IRR_Servies,159,239,283,411,910,511,611
Al Adrak Camp,4300348,DC,Direct Connection,Main Bulk (NAMA),Retail,1038,702,1161,1000,1228,1015,972
Al Adrak Company (accommodation)Camp Area,4300349,L2,Direct Connection,Main Bulk (NAMA),Retail,,,,,,1758,1802
Main Bulk (NAMA),C43659,L1,Main Bulk,NAMA,Main BULK,32580,44043,34915,46039,58425,41840,41475
Irrigation Tank 01 (Outlet),4300322,N/A,N/A,N/A,IRR_Servies,0,0,0,0,0,0,20391
Irrigation Tank - VS (TSE Water),4300347,N/A,N/A,N/A,IRR_Servies,597,520,580,600,2698,1164,810
ZONE FM ( BULK ZONE FM ),4300346,L2,Zone_01_(FM),Main Bulk (NAMA),Zone Bulk,2008,1740,1880,1880,1693,1659,1974
Building FM,4300296,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),MB_Common,37,39,49,40,41,32,44
Building Taxi,4300298,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,11,16,12,14,13,14,13
Building B1,4300300,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,228,225,235,253,233,144,229
Building B2,4300301,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,236,213,202,187,199,171,191
Building B3,4300302,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,169,165,132,134,160,151,170
Building B4,4300303,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,108,108,148,148,121,149,159
Building B5,4300304,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,1,2,1,1,0,179,62
Building B6,4300305,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,254,228,268,281,214,194,196
Building B7,4300306,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,178,190,174,201,200,154,192
Building B8,4300307,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,268,250,233,0,413,213,62
Irrigation Tank (Z01_FM),4300308,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),IRR_Servies,0,0,0,0,0,0,0
Room PUMP (FIRE),4300309,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),MB_Common,78,0,0,0,0,0,0
Building (MEP),4300310,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),MB_Common,2,2,1,5,6,2,1
Building CIF/CB,4300324,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,420,331,306,307,284,241,443
Building Nursery Building,4300325,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,4,4,4,0,6,4,2
Cabinet FM (CONTRACTORS OFFICE),4300337,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Building,68,59,52,58,51,49,56
Building CIF/CB (COFFEE SH),4300339,L3,Zone_01_(FM),ZONE FM ( BULK ZONE FM ),Retail,0,0,0,0,0,0,0
ZONE 3A (Bulk Zone 3A),4300343,L2,Zone_03_(A),Main Bulk (NAMA),Zone Bulk,4235,4273,3591,4041,4898,6484,6026
Z3-42 (Villa),4300002,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),32,46,19,62,87,59,53
Z3-38 (Villa),4300005,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),10,7,7,7,8,6,109
Z3-23 (Villa),4300038,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),0,0,0,0,1,1,1
Z3-41 (Villa),4300044,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),13,18,34,26,25,42,31
Z3-37 (Villa),4300049,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),26,15,18,28,49,15,37
Z3-43 (Villa),4300050,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),70,68,46,52,48,78,55
Z3-31 (Villa),4300052,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),165,133,30,306,527,240,109
Z3-35 (Villa),4300075,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),65,61,52,74,68,86,70
Z3-40 (Villa),4300079,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),18,23,37,37,139,39,13
Z3-30 (Villa),4300081,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),0,0,4,0,0,0,1
Z3-33 (Villa),4300082,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),45,45,40,50,49,34,0
Z3-36 (Villa),4300084,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),81,83,69,83,170,166,157
Z3-32 (Villa),4300085,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),38,39,33,38,40,39,35
Z3-39 (Villa),4300086,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),39,36,29,33,41,33,38
Z3-34 (Villa),4300087,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),0,0,0,20,18,9,10
Z3-27 (Villa),4300089,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),15,32,55,73,25,63,123
Z3-24 (Villa),4300091,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),18,39,78,101,75,60,70
Z3-25 (Villa),4300093,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),3,0,0,0,0,0,0
Z3-26 (Villa),4300095,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),0,0,0,0,0,0,0
Z3-29 (Villa),4300097,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),0,7,3,2,0,6,3
Z3-28 (Villa),4300101,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),Residential (Villa),44,38,30,41,53,43,57
D-75 Building Bulk Meter,4300176,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,63,60,66,71,59,62,67
D-74 Building Bulk Meter,4300177,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,41,35,36,54,51,62,101
D-44 Building Bulk Meter,4300178,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,,,746,,62,49,52
D-45 Building Bulk Meter,4300179,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,20,32,44,56,55,10,12
D-46 Building Bulk Meter,4300180,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,61,46,29,68,69,55,65
D-47 Building Bulk Meter,4300181,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,103,70,55,69,57,83,121
D-48 Building Bulk Meter,4300182,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,17,17,19,18,25,47,28
D-49 Building Bulk Meter,4300183,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,58,63,59,0,108,42,59
D-50 Building Bulk Meter,4300184,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,65,81,82,49,34,39,60
D-51 Building Bulk Meter,4300185,L3,Zone_03_(A),ZONE 3A (BULK ZONE 3A),D_Building_Bulk,92,108,152,166,111,100,149
Z3-46(5) (Building),4300003,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),5,0,0,0,4,4,4
Z3-49(3) (Building),4300004,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),10,15,11,13,12,3,4
Z3-75(4) (Building),4300006,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),0,0,0,0,1,0,0
Z3-46(3A) (Building),4300007,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),38,35,15,35,43,34,39
Z3-049(4) (Building),4300010,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),8,1,8,0,0,0,0
Z3-46(1A) (Building),4300011,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),11,10,10,11,11,12,15
Z3-47(2) (Building),4300012,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),1,1,1,1,1,3,1
Z3-45(3A) (Building),4300013,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),8,4,0,1,1,1,0
Z3-46(2A) (Building),4300014,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-46(6) (Building),4300015,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),3,1,1,5,5,4,3
Z3-47(4) (Building),4300016,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),11,12,0,1,0,7,2
Z3-45(5) (Building),4300017,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),5,3,2,2,2,2,0
Z3-47(5) (Building),4300018,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),36,12,11,18,16,12,13
Z3-45(6) (Building),4300019,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),5,18,32,42,47,4,5
Z3-50(4) (Building),4300021,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),6,4,6,17,7,7,19
Z3-74(3) (Building),4300022,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),12,19,19,27,26,20,30
Z3-45(4A) (Building),4300026,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,4
Z3-50(5) (Building),4300027,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),9,10,22,11,11,13,12
Z3-50(6) (Building),4300028,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),21,20,18,13,16,15,18
Z3-44(1A) (Building),4300030,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),11,11,10,6,11,8,2
Z3-44(1B) (Building),4300031,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-44(2A) (Building),4300032,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),9,3,5,10,7,2,3
Z3-44(2B) (Building),4300033,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),7,7,7,8,3,0,0
Z3-44(5) (Building),4300034,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),118,139,38,25,6,6,9
Z3-44(6) (Building),4300035,L4,Zone_03_(A),D-44 Building Bulk Meter,Residential (Apart),34,37,31,37,35,32,37
Z3-75(1) (Building),4300036,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),1,0,0,1,1,1,1
Z3-75(3) (Building),4300037,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),2,7,0,6,0,0,0
Z3-47(3) (Building),4300039,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),18,19,17,17,18,21,46
Z3-48(3) (Building),4300040,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),3,5,4,4,7,7,2
Z3-48(6) (Building),4300041,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),0,0,0,1,0,0,0
Z3-46(4A) (Building),4300043,L4,Zone_03_(A),D-46 Building Bulk Meter,Residential (Apart),4,1,0,19,5,0,2
Z3-74(5) (Building),4300045,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),13,7,12,16,9,12,15
Z3-74(6) (Building),4300046,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),12,4,4,5,5,5,16
Z3-50(3) (Building),4300047,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),8,13,6,0,0,0,0
Z3-48(5) (Building),4300048,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),2,1,1,0,0,0,0
Z3-47(6) (Building),4300051,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),29,14,16,17,9,6,5
Z3-49(5) (Building),4300053,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),0,5,0,0,0,0,3
Z3-75(5) (Building),4300055,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),16,12,12,16,16,16,14
Z3-49(6) (Building),4300061,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),25,22,21,27,22,20,29
Z3-75(6) (Building),4300063,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),35,32,35,36,26,31,31
Z3-74(1) (Building),4300106,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),1,0,0,1,1,5,3
Z3-49(1) (Building),4300107,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),0,4,3,9,3,5,8
Z3-49(2) (Building),4300108,L4,Zone_03_(A),D-49 Building Bulk Meter,Residential (Apart),15,15,12,15,13,12,4
Z3-50(1) (Building),4300109,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),22,26,28,6,1,1,12
Z3-45(1A) (Building),4300110,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),0,1,0,0,1,2,0
Z3-51(1) (Building),4300111,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),0,0,0,0,1,0,0
Z3-51(2) (Building),4300112,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),32,28,31,30,32,29,33
Z3-45(2A) (Building),4300113,L4,Zone_03_(A),D-45 Building Bulk Meter,Residential (Apart),2,7,9,11,4,0,0
Z3-050(2) (Building),4300114,L4,Zone_03_(A),D-50 Building Bulk Meter,Residential (Apart),0,8,0,3,0,3,0
Z3-47(1) (Building),4300115,L4,Zone_03_(A),D-47 Building Bulk Meter,Residential (Apart),9,11,10,15,10,5,0
Z3-48(1) (Building),4300117,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),3,5,4,5,14,30,19
Z3-74(2) (Building),4300118,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-51(3) (Building),4300121,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),13,10,9,11,14,12,14
Z3-75(2) (Building),4300122,L4,Zone_03_(A),D-75 Building Bulk Meter,Residential (Apart),7,7,9,8,7,8,14
Z3-48(2) (Building),4300123,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),3,0,4,2,0,4,0
Z3-74(4) (Building),4300125,L4,Zone_03_(A),D-74 Building Bulk Meter,Residential (Apart),0,2,0,0,0,0,1
Z3-51(4) (Building),4300127,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),11,9,12,9,11,10,24
Z3-051(5) (Building),4300128,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),2,5,19,6,7,9,22
Z3-48(4) (Building),4300131,L4,Zone_03_(A),D-48 Building Bulk Meter,Residential (Apart),5,5,5,4,2,4,6
Z3-51(6) (Building),4300134,L4,Zone_03_(A),D-51 Building Bulk Meter,Residential (Apart),8,2,5,6,9,9,10
D 45-Building Common Meter,4300135,L4,Zone_03_(A),D-45 Building Bulk Meter,D_Building_Common,0,1,1,0,1,0,1
D 50-Building Common Meter,4300136,L4,Zone_03_(A),D-50 Building Bulk Meter,D_Building_Common,1,1,1,1,1,1,1
D 51-Building Common Meter,4300137,L4,Zone_03_(A),D-51 Building Bulk Meter,D_Building_Common,1,0,1,1,2,2,1
D 46-Building Common Meter,4300138,L4,Zone_03_(A),D-46 Building Bulk Meter,D_Building_Common,1,0,1,0,1,0,1
D 74-Building Common Meter,4300139,L4,Zone_03_(A),D-74 Building Bulk Meter,D_Building_Common,0,1,1,2,1,1,1
D 49-Building Common Meter,4300140,L4,Zone_03_(A),D-49 Building Bulk Meter,D_Building_Common,0,1,2,1,1,1,1
D 48-Building Common Meter,4300141,L4,Zone_03_(A),D-48 Building Bulk Meter,D_Building_Common,0,1,0,1,0,0,1
D 47-Building Common Meter,4300143,L4,Zone_03_(A),D-47 Building Bulk Meter,D_Building_Common,1,0,0,2,1,0,1
D 44-Building Common Meter,4300144,L4,Zone_03_(A),D-44 Building Bulk Meter,D_Building_Common,1,1,0,1,1,1,1
D 75-Building Common Meter,4300145,L4,Zone_03_(A),D-75 Building Bulk Meter,D_Building_Common,3,4,3,7,9,6,7
ZONE 3B (Bulk Zone 3B),4300344,L2,Zone_03_(B),Main Bulk (NAMA),Zone Bulk,3256,2962,3331,2157,3093,3231,3243
Z3-21 (Villa),4300009,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),41,53,42,48,51,39,70
Z3-20 (Villa),4300020,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),12,14,7,3,5,14,12
Z3-13 (Villa),4300025,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),20,22,18,24,20,15,6
Z3-15 (Villa),4300057,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),40,41,35,47,44,43,39
Z3-14 (Villa),4300060,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),166,102,30,43,32,82,75
Z3-12 (Villa),4300076,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),73,59,54,181,178,249,188
Z3-11 (Villa),4300077,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),0,0,0,0,0,0,0
Z3-4 (Villa),4300078,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),90,55,22,23,113,125,225
Z3-17 (Villa),4300080,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),19,8,5,13,15,13,14
Z3-18 (Villa),4300083,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),36,36,33,39,76,99,92
Z3-3 (Villa),4300088,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),66,59,63,73,176,192,136
Z3-7 (Villa),4300090,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),38,45,46,57,58,45,47
Z3-10 (Villa),4300092,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),78,81,62,101,89,95,84
Z3-1 (Villa),4300094,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),4,4,5,7,7,14,37
Z3-9 (Villa),4300096,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),67,49,55,60,69,75,81
Z3-2 (Villa),4300098,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),6,6,8,7,38,17,26
Z3-19 (Villa),4300099,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),138,6,26,108,77,8,0
Z3-6 (Villa),4300100,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),31,33,38,36,30,32,58
Z3-22 (Villa),4300102,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),32,14,53,31,32,34,34
Z3-16 (Villa),4300103,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),1,28,2,5,21,64,51
Z3-5 (Villa),4300104,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),40,51,42,55,51,33,74
Z3-8 (Villa),4300105,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),Residential (Villa),83,106,196,358,414,346,132
D-52 Building Bulk Meter,4300186,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,40,35,25,37,48,46,52
D-62 Building Bulk Meter,4300187,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,49,32,39,35,22,26,47
D-53 Building Bulk Meter,4300311,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,18,27,26,39,21,27,26
D-54 Building Bulk Meter,4300312,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,63,52,66,95,51,55,76
D-55 Building Bulk Meter,4300313,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,71,62,107,181,94,60,79
D-56 Building Bulk Meter,4300314,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,92,17,39,0,,,92
D-57 Building Bulk Meter,4300315,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,47,65,48,63,72,46,64
D-58 Building Bulk Meter,4300316,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,56,52,57,94,83,62,63
D-59 Building Bulk Meter,4300317,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,57,60,47,66,47,44,53
D-60 Building Bulk Meter,4300318,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,56,83,86,102,91,84,84
D-61 Building Bulk Meter,4300319,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),D_Building_Bulk,42,50,68,82,49,43,62
Irrigation Tank 02 (Z03),4300320,L3,Zone_03_(B),ZONE 3B (BULK ZONE 3B),IRR_Servies,49,47,43,15,320,106,91
Z3-52(6) (Building),4300008,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),10,9,9,14,12,17,15
Z3-52(4A) (Building),4300029,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),0,0,0,0,6,6,7
Z3-52(3A) (Building),4300042,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),6,9,5,5,11,7,9
Z3-62(6) (Building),4300054,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),39,19,17,11,3,2,2
Z3-52(5) (Building),4300056,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),5,3,4,7,9,8,6
Z3-62(1) (Building),4300062,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),4,1,15,10,5,6,15
Z3-53(4B) (Building),4300064,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-60(1B) (Building),4300065,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),14,14,9,14,13,11,12
Z3-59(4B) (Building),4300066,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),3,3,0,1,0,0,0
Z3-60(3B) (Building),4300067,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),0,2,0,0,0,0,0
Z3-60(4B) (Building),4300068,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),1,3,5,6,4,1,5
Z3-52(2A) (Building),4300069,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-58(1B) (Building),4300070,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),2,2,1,2,3,2,2
Z3-55(1B) (Building),4300071,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),3,4,3,3,4,2,3
Z3-60(2B) (Building),4300072,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),3,0,0,11,2,1,0
Z3-59(3A) (Building),4300073,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-53(6) (Building),4300074,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,2
Z3-52(1A) (Building),4300116,L4,Zone_03_(B),D-52 Building Bulk Meter,Residential (Apart),19,14,5,8,8,7,15
Z3-62(2) (Building),4300119,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),7,10,8,11,14,18,28
Z3-58(5) (Building),4300120,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),29,23,32,30,30,23,26
Z3-62(3) (Building),4300124,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
D 52-Building Common Meter,4300126,L4,Zone_03_(B),D-52 Building Bulk Meter,D_Building_Common,1,1,2,4,1,2,1
Z3-62(4) (Building),4300129,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-58(3B) (Building),4300130,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),6,6,3,29,7,10,8
Z3-058(4B) (Building),4300132,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),9,8,4,6,5,0,0
Z3-62(5) (Building),4300133,L4,Zone_03_(B),D-62 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,1
D 62-Building Common Meter,4300142,L4,Zone_03_(B),D-62 Building Bulk Meter,D_Building_Common,0,0,0,0,0,0,0
D 53-Building Common Meter,4300201,L4,Zone_03_(B),D-53 Building Bulk Meter,D_Building_Common,0,1,7,2,2,1,1
D 54-Building Common Meter,4300202,L4,Zone_03_(B),D-54 Building Bulk Meter,D_Building_Common,0,1,1,3,1,1,1
D 55-Building Common Meter,4300203,L4,Zone_03_(B),D-55 Building Bulk Meter,D_Building_Common,1,1,2,3,2,0,1
D 56-Building Common Meter,4300204,L4,Zone_03_(B),D-56 Building Bulk Meter,D_Building_Common,1,2,8,3,4,2,2
D 57-Building Common Meter,4300205,L4,Zone_03_(B),D-57 Building Bulk Meter,D_Building_Common,2,1,4,7,3,2,3
D 58-Building Common Meter,4300206,L4,Zone_03_(B),D-58 Building Bulk Meter,D_Building_Common,1,0,0,3,0,1,1
D 59-Building Common Meter,4300207,L4,Zone_03_(B),D-59 Building Bulk Meter,D_Building_Common,1,0,1,1,1,0,1
D 60-Building Common Meter,4300208,L4,Zone_03_(B),D-60 Building Bulk Meter,D_Building_Common,1,1,0,1,2,0,1
D 61-Building Common Meter,4300209,L4,Zone_03_(B),D-61 Building Bulk Meter,D_Building_Common,1,0,1,2,0,1,1
Z3-53(1A) (Building),4300210,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),8,9,10,12,4,17,12
Z3-53(1B) (Building),4300211,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),6,8,6,8,9,8,7
Z3-53(2A) (Building),4300212,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-53(2B) (Building),4300213,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-53(3A) (Building),4300214,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,1,0,6,0,0,0
Z3-53(3B) (Building),4300215,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),1,3,1,6,6,1,0
Z3-53(4A) (Building),4300216,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),0,5,0,5,0,0,4
Z3-53(5) (Building),4300217,L4,Zone_03_(B),D-53 Building Bulk Meter,Residential (Apart),2,1,1,0,0,0,0
Z3-54(1A) (Building),4300218,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),11,12,8,13,5,15,30
Z3-54(1B) (Building),4300219,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),1,1,5,6,3,0,5
Z3-54(2A) (Building),4300220,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),3,3,3,1,0,0,1
Z3-54(2B) (Building),4300221,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),20,9,19,14,10,5,12
Z3-54(3A) (Building),4300222,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),8,8,3,8,5,0,0
Z3-54(3B) (Building),4300223,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),1,1,0,1,0,0,0
Z3-54(4A) (Building),4300224,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),0,0,0,14,0,12,0
Z3-54(4B) (Building),4300225,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),0,0,1,2,0,0,0
Z3-54(5) (Building),4300226,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),15,18,11,19,19,16,17
Z3-54(6) (Building),4300227,L4,Zone_03_(B),D-54 Building Bulk Meter,Residential (Apart),5,4,4,23,9,9,12
Z3-55(1A) (Building),4300228,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-55(2A) (Building),4300229,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),23,24,5,15,25,25,25
Z3-55(2B) (Building),4300230,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),3,4,5,5,4,0,4
Z3-55(3A) (Building),4300231,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),17,8,4,10,12,9,24
Z3-55(3B) (Building),4300232,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),7,3,5,7,5,7,6
Z3-55(4A) (Building),4300233,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),4,7,7,9,6,12,11
Z3-55(4B) (Building),4300234,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),6,5,5,5,3,4,4
Z3-55(5) (Building),4300235,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),0,1,1,0,1,0,0
Z3-55(6) (Building),4300236,L4,Zone_03_(B),D-55 Building Bulk Meter,Residential (Apart),7,5,68,129,31,0,0
Z3-56(1A) (Building),4300237,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),50,0,0,0,0,0,0
Z3-56(1B) (Building),4300238,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),1,0,0,0,1,0,1
Z3-56(2A) (Building),4300239,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),2,7,0,4,6,1,0
Z3-56(2B) (Building),4300240,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),5,1,8,11,3,0,0
Z3-56(3A) (Building),4300241,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),0,0,0,0,0,9,13
Z3-56(3B) (Building),4300242,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),0,1,0,0,0,0,0
Z3-56(4A) (Building),4300243,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),0,0,4,3,2,1,0
Z3-56(4B) (Building),4300244,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),7,0,0,0,0,4,9
Z3-56(5) (Building),4300245,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),1,2,0,1,0,0,4
Z3-56(6) (Building),4300246,L4,Zone_03_(B),D-56 Building Bulk Meter,Residential (Apart),14,3,17,3,0,0,0
Z3-57(1A) (Building),4300247,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),2,8,0,0,2,5,2
Z3-57(1B) (Building),4300248,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),3,1,0,1,0,1,0
Z3-57(2A) (Building),4300249,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),4,5,5,4,5,3,3
Z3-57(2B) (Building),4300250,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),1,1,5,8,11,7,7
Z3-57(3A) (Building),4300251,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),6,4,5,5,7,7,11
Z3-57(3B) (Building),4300252,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),0,0,1,0,0,0,0
Z3-57(4A) (Building),4300253,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),0,0,0,1,0,0,1
Z3-57(4B) (Building),4300254,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),0,3,0,3,0,4,0
Z3-57(5) (Building),4300255,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),17,14,7,21,30,24,23
Z3-57(6) (Building),4300256,L4,Zone_03_(B),D-57 Building Bulk Meter,Residential (Apart),10,26,22,14,13,6,9
Z3-58(1A) (Building),4300257,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),3,2,4,4,4,1,2
Z3-58(2A) (Building),4300258,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),0,0,4,5,0,0,0
Z3-58(2B) (Building),4300259,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),5,5,1,9,6,3,8
Z3-58(3A) (Building),4300260,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),0,0,0,0,12,8,4
Z3-58(4A) (Building),4300261,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),0,0,1,0,0,0,0
Z3-58(6) (Building),4300262,L4,Zone_03_(B),D-58 Building Bulk Meter,Residential (Apart),2,3,3,9,14,13,12
Z3-59(1A) (Building),4300263,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),7,7,4,5,6,4,4
Z3-59(1B) (Building),4300264,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),2,4,1,0,0,0,0
Z3-59(2A) (Building),4300265,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),9,13,14,14,14,13,13
Z3-59(2B) (Building),4300266,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),13,15,10,16,10,12,11
Z3-59(3B) (Building),4300267,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),1,4,3,3,0,0,0
Z3-59(4A) (Building),4300268,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),10,8,6,7,4,7,12
Z3-59(5) (Building),4300269,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),12,3,7,11,6,4,10
Z3-59(6) (Building),4300270,L4,Zone_03_(B),D-59 Building Bulk Meter,Residential (Apart),0,1,1,0,14,3,1
Z3-60(1A) (Building),4300271,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),3,7,6,6,6,3,6
Z3-60(2A) (Building),4300272,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),4,4,3,3,4,10,5
Z3-60(3A) (Building),4300273,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),5,10,15,10,7,6,4
Z3-60(4A) (Building),4300274,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),6,5,5,5,8,3,3
Z3-60(5) (Building),4300275,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),0,0,0,0,0,0,0
Z3-60(6) (Building),4300276,L4,Zone_03_(B),D-60 Building Bulk Meter,Residential (Apart),20,38,39,49,45,49,48
Z3-61(1A) (Building),4300277,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),2,0,3,3,1,0,0
Z3-61(1B) (Building),4300278,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),9,9,2,9,2,8,9
Z3-61(2A) (Building),4300279,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),0,0,11,11,13,3,1
Z3-61(2B) (Building),4300280,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),0,1,0,1,1,1,1
Z3-61(3A) (Building),4300281,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),0,7,19,23,2,0,0
Z3-61(3B) (Building),4300282,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),0,0,0,5,11,11,8
Z3-61(4A) (Building),4300283,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),6,11,5,9,5,7,6
Z3-61(4B) (Building),4300284,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),2,5,8,4,2,3,4
Z3-61(5) (Building),4300285,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),6,0,1,2,0,0,0
Z3-61(6) (Building),4300286,L4,Zone_03_(B),D-61 Building Bulk Meter,Residential (Apart),16,16,17,17,12,9,16
ZONE 5 (Bulk Zone 5),4300345,L2,Zone_05,Main Bulk (NAMA),Zone Bulk,4267,4231,3862,3737,3849,4116,3497
Z5-17,4300001,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),112,80,81,90,58,72,88
Z5-13,4300058,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),72,106,89,120,109,115,155
Z5-14,4300059,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),71,93,77,93,82,96,67
Z5-5,4300146,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),3,6,2,5,39,1,60
Z5-30,4300147,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),65,87,71,113,203,238,212
Z5-2,4300148,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),0,0,0,0,0,0,0
Z5-10,4300149,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),37,0,0,0,0,0,0
Z5-4,4300150,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),81,98,35,49,29,14,49
Z5-6,4300151,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),6,3,10,5,37,0,0
Z5 020,4300152,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),25,30,147,164,202,211,198
Z5-23,4300153,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),0,22,19,0,0,1,0
Z5-15,4300154,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),35,19,16,23,30,17,21
Z5-9,4300155,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),38,49,40,56,77,67,56
Z5-26,4300156,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),61,41,16,69,107,82,57
Z5-25,4300157,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),37,24,10,71,104,82,57
Z5-31,4300158,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),33,24,14,16,4,1,0
Z5-33,4300159,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),2,0,24,0,19,12,0
Z5-29,4300160,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),49,66,21,20,28,24,19
Z5-28,4300161,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),50,21,9,8,14,19,16
Z5-32,4300162,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),59,119,71,72,68,51,25
Z5-22,4300163,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),15,40,186,243,201,186,192
Z5-7,4300164,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),0,26,14,7,5,2,0
Z5-27,4300165,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),36,13,19,12,15,9,9
Z5-12,4300166,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),44,47,40,66,81,97,84
Z5 024,4300167,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),68,1,0,0,0,0,0
Z5 016,4300168,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),27,29,37,51,53,48,71
Z5-21,4300169,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),25,22,34,58,57,43,38
Z5-3,4300170,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),149,86,67,100,70,82,95
Z5 019,4300171,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),5,7,6,2,57,0,31
Z5-1,4300172,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),5,5,4,5,47,5,33
Z5-11,4300173,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),30,45,3,3,9,9,17
Z5-18,4300174,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),8,12,11,37,30,30,28
Z5-8,4300175,L3,Zone_05,ZONE 5 (Bulk Zone 5),Residential (Villa),6,12,11,67,12,1,0
Irrigation Tank 03 (Z05),4300321,L3,Zone_05,ZONE 5 (Bulk Zone 5),IRR_Servies,0,0,0,0,0,0,0
ZONE 8 (Bulk Zone 8),4300342,L2,Zone_08,Main Bulk (NAMA),Zone Bulk,1547,1498,2605,3203,2937,3142,3542
Z8-11,4300023,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,1,0,0,0,0,0
Z8-13,4300024,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,1,229
Z8-1,4300188,L3,Zone_08,BULK ZONE 8,Residential (Villa),1,2,3,16,7,0,2
Z8-2,4300189,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-3,4300190,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-4,4300191,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-6,4300192,L3,Zone_08,BULK ZONE 8,Residential (Villa),1,0,0,0,0,0,0
Z8-7,4300193,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-8,4300194,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-10,4300195,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-12,4300196,L3,Zone_08,BULK ZONE 8,Residential (Villa),236,192,249,267,295,386,466
Z8-14,4300197,L3,Zone_08,BULK ZONE 8,Residential (Villa),0,0,0,0,0,0,0
Z8-15,4300198,L3,Zone_08,BULK ZONE 8,Residential (Villa),99,61,70,125,112,121,123
Z8-16,4300199,L3,Zone_08,BULK ZONE 8,Residential (Villa),67,72,54,98,95,79,132
Z8-17,4300200,L3,Zone_08,BULK ZONE 8,Residential (Villa),164,162,171,207,238,211,192
Z8-5,4300287,L3,Zone_08,BULK ZONE 8,Residential (Villa),208,341,313,336,325,236,224
Z8-9,4300288,L3,Zone_08,BULK ZONE 8,Residential (Villa),5,12,5,4,6,3,1
Z8-18,4300289,L3,Zone_08,BULK ZONE 8,Residential (Villa),122,111,336,0,679,362,244
Z8-19,4300290,L3,Zone_08,BULK ZONE 8,Residential (Villa),104,87,231,0,513,255,195
Z8-20,4300291,L3,Zone_08,BULK ZONE 8,Residential (Villa),146,110,312,0,579,94,117
Z8-21,4300292,L3,Zone_08,BULK ZONE 8,Residential (Villa),99,72,276,0,393,115,60
Z8-22,4300293,L3,Zone_08,BULK ZONE 8,Residential (Villa),225,156,336,0,806,265,105
Sales Center Common Building,4300295,L2,Zone_SC,Main Bulk (NAMA),Zone Bulk,76,68,37,67,63,55,60
Sale Centre Caffe & Bar (GF Shop No.592 A),4300328,L3,Zone_SC,Sale Centre (Zone Bulk),Retail,0,2,3,5,12,5,20
Village Square (Zone Bulk),4300335,L2,Zone_VS,Main Bulk (NAMA),Zone Bulk,14,12,21,13,21,19,60
Irrigation Tank - VS PO Water,4300326,L3,Zone_VS,Village Square (Zone Bulk),IRR_Servies,0,0,0,0,0,0,0
Coffee 1 (GF Shop No.591),4300327,L3,Zone_VS,Village Square (Zone Bulk),Retail,0,0,3,-3,0,0,0
Coffee 2 (GF Shop No.594 A),4300329,L3,Zone_VS,Village Square (Zone Bulk),Retail,2,3,5,5,5,4,9
Supermarket (FF Shop No.591),4300330,L3,Zone_VS,Village Square (Zone Bulk),Retail,0,0,0,0,0,0,0
Pharmacy (FF Shop No.591 A),4300331,L3,Zone_VS,Village Square (Zone Bulk),Retail,0,0,0,0,0,0,0
Laundry Services (FF Shop No.593),4300332,L3,Zone_VS,Village Square (Zone Bulk),Retail,33,25,22,0,44,28,44
Shop No.593 A,4300333,L3,Zone_VS,Village Square (Zone Bulk),Retail,0,0,0,0,0,0,0
`;

interface DataRow {
    [key: string]: string | number;
}

function parseCSV(csv: string): DataRow[] {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
        const values: string[] = [];
        let current = '';
        let inQuote = false;
        for (const char of line) {
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current);

        const row: DataRow = {};
        headers.forEach((header, i) => {
            const value = (values[i] || '').trim().replace(/^"|"$/g, '');
            row[header] = /^[A-Za-z]{3}-\d{2}$/.test(header) ? (value === '' ? 0 : Number(value)) : value;
        });
        return row;
    });
    return data;
}

export const waterData = parseCSV(waterCsvData);

export const allMonthColumns = Object.keys(waterData[0]).filter(key => /^[A-Za-z]{3}-\d{2}$/.test(key));

const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
};

export function getMonthColumns(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return allMonthColumns; // fallback if dates are invalid
    }

    const filterStart = new Date(start.getFullYear(), start.getMonth(), 1);
    const filterEnd = new Date(end.getFullYear(), end.getMonth(), 1);

    return allMonthColumns.filter(col => {
        const [monthStr, yearStr] = col.split('-');
        if (!monthStr || !yearStr) return false;

        const year = 2000 + parseInt(yearStr, 10);
        const month = monthMap[monthStr];
        if (month === undefined) return false;

        const colDate = new Date(year, month, 1);

        return colDate >= filterStart && colDate <= filterEnd;
    });
}


export function calculateWaterMetrics(monthColumns: string[]) {
    const sum = (predicate: (row: DataRow) => boolean) =>
        waterData.filter(predicate).reduce((acc, row) => {
            return acc + monthColumns.reduce((monthAcc, month) => monthAcc + Number(row[month] || 0), 0);
        }, 0);

    // Levels
    const L1 = sum(r => r['Label'] === 'L1');
    const L2 = sum(r => r['Label'] === 'L2');
    const DC = sum(r => r['Label'] === 'DC');
    const L3_Villas = sum(r => r['Label'] === 'L3' && (r['Type'] as string).includes('Villa'));
    const L3_Building_Bulks = sum(r => r['Label'] === 'L3' && r['Type'] === 'D_Building_Bulk');
    const L4 = sum(r => r['Label'] === 'L4');

    // Distribution Calculations (A Values) per spec
    const A1 = L1;
    const A2 = L2 + DC;
    const A3_Bulk = L3_Villas + L3_Building_Bulks + DC;
    const A3_Individual = L3_Villas + L4 + DC;

    // Water Loss Calculations per spec
    const Stage1_Loss = A1 - A2;
    const Stage2_Loss_Bulk = A2 - A3_Bulk;
    const Stage2_Loss_Individual = A2 - A3_Individual;
    const Stage3_Loss = L3_Building_Bulks - L4;
    const Total_Loss = Stage1_Loss + Stage2_Loss_Individual;

    // Performance Metrics per spec & common sense
    const efficiency = A1 > 0 ? (A3_Individual / A1) * 100 : 0;
    const totalLossPercentage = A1 > 0 ? (Total_Loss / A1) * 100 : 0;
    const stage1LossPercentage = A1 > 0 ? (Stage1_Loss / A1) * 100 : 0;
    const stage2LossPercentage = A2 > 0 ? (Stage2_Loss_Individual / A2) * 100 : 0;
    const stage3LossPercentage = L3_Building_Bulks > 0 ? (Stage3_Loss / L3_Building_Bulks) * 100 : 0;

    const monthlyData = monthColumns.map(month => {
        const sumMonth = (predicate: (row: DataRow) => boolean) =>
            waterData.filter(predicate).reduce((acc, row) => acc + Number(row[month] || 0), 0);
        
        const mL1 = sumMonth(r => r['Label'] === 'L1');
        const mL2 = sumMonth(r => r['Label'] === 'L2');
        const mDC = sumMonth(r => r['Label'] === 'DC');
        const mL3_Villas = sumMonth(r => r['Label'] === 'L3' && (r['Type'] as string).includes('Villa'));
        const mL3_Building_Bulks = sumMonth(r => r['Label'] === 'L3' && r['Type'] === 'D_Building_Bulk');
        const mL4 = sumMonth(r => r['Label'] === 'L4');
        
        const mA1 = mL1;
        const mA2 = mL2 + mDC;
        const mA3_Individual = mL3_Villas + mL4 + mDC;

        const mStage1_Loss = mA1 - mA2;
        const mStage2_Loss = mA2 - mA3_Individual;
        const mStage3_Loss = mL3_Building_Bulks - mL4;
        
        return {
            name: month,
            'L1 - Main Source': mA1,
            'L2 - Zone Bulk Meters': mL2,
            'L3 - Building/Villa Meters': mA3_Individual,
            'Stage 1 Loss': mStage1_Loss,
            'Stage 2 Loss': mStage2_Loss,
            'Stage 3 Loss': mStage3_Loss,
        };
    });

    return {
        totals: {
            A1, A2, A3_Bulk, A3_Individual, L4, L3_Building_Bulks,
            Stage1_Loss, Stage2_Loss_Bulk, Stage2_Loss_Individual, Stage3_Loss, Total_Loss,
            efficiency, totalLossPercentage, stage1LossPercentage, stage2LossPercentage, stage3LossPercentage
        },
        monthly: monthlyData,
        raw: waterData,
    };
}


export function getConsumptionByType(months: string[]) {
    const l1Row = waterData.find(r => r['Label'] === 'L1');
    const totalL1 = l1Row ? months.reduce((sum, month) => sum + Number(l1Row[month] || 0), 0) : 1;

    const mapType = (type: string): string | null => {
        if (type.includes('Residential')) return 'Residential';
        if (type.includes('Retail')) return 'Commercial';
        if (type.includes('IRR_Servies')) return 'Irrigation';
        if (type.includes('Common') || type === 'Building') return 'Common';
        return null;
    };

    const consumptionData = waterData.reduce((acc, row) => {
        const isEndPoint = (row['Label'] === 'L3' && (row['Type'] as string).includes('Villa')) ||
                           row['Label'] === 'L4' ||
                           row['Label'] === 'DC';

        if (isEndPoint) {
            const mapped = mapType(row['Type'] as string);
            if (mapped) {
                if (!acc[mapped]) {
                    acc[mapped] = { name: mapped, total: 0 };
                    months.forEach(m => { acc[mapped][m] = 0; });
                }
                months.forEach(m => {
                    const monthValue = Number(row[m] || 0);
                    acc[mapped][m] += monthValue;
                    acc[mapped].total += monthValue;
                });
            }
        }
        return acc;
    }, {} as { [key: string]: { name: string, total: number, [month: string]: any } });

    const result = Object.values(consumptionData).map(item => ({
        ...item,
        '% OF L1': totalL1 > 0 ? ((item.total / totalL1) * 100).toFixed(1) + '%' : '0.0%'
    }));
    
    const order = ['Commercial', 'Residential', 'Irrigation', 'Common'];
    result.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    return {
        data: result,
        months: months,
    };
}