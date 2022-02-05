const genreList = [
  {
    id: 1,
    genreName: "Acoustic Blues",
  },
  {
    id: 2,
    genreName: "Adult Alternative",
  },
  {
    id: 3,
    genreName: "Adult Contemporary",
  },
  {
    id: 4,
    genreName: "African",
  },
  {
    id: 5,
    genreName: "African Dancehall",
  },
  {
    id: 6,
    genreName: "African Reggae",
  },
  {
    id: 7,
    genreName: "Afrikaans",
  },
  {
    id: 8,
    genreName: "Afro House",
  },
  {
    id: 9,
    genreName: "Afro Soul",
  },
  {
    id: 10,
    genreName: "Afro-Beat",
  },
  {
    id: 11,
    genreName: "Afro-folk",
  },
  {
    id: 12,
    genreName: "Afro-fusion",
  },
  {
    id: 13,
    genreName: "Afro-Pop",
  },
  {
    id: 14,
    genreName: "Afrobeats",
  },
  {
    id: 15,
    genreName: "Alte",
  },
  {
    id: 16,
    genreName: "Alternative",
  },
  {
    id: 17,
    genreName: "Alternative & Rock in Spanish",
  },
  {
    id: 18,
    genreName: "Alternative Country",
  },
  {
    id: 19,
    genreName: "Alternative Folk",
  },
  {
    id: 20,
    genreName: "Alternative Rap",
  },
  {
    id: 21,
    genreName: "Amapiano",
  },
  {
    id: 22,
    genreName: "Ambient",
  },
  {
    id: 23,
    genreName: "American Trad Rock",
  },
  {
    id: 24,
    genreName: "Americana",
  },
  {
    id: 25,
    genreName: "Anime",
  },
  {
    id: 26,
    genreName: "Arabesk",
  },
  {
    id: 27,
    genreName: "Arabic",
  },
  {
    id: 28,
    genreName: "Arabic Pop",
  },
  {
    id: 29,
    genreName: "Arena Rock",
  },
  {
    id: 30,
    genreName: "Art Song",
  },
  {
    id: 31,
    genreName: "Asia",
  },
  {
    id: 32,
    genreName: "Assamese",
  },
  {
    id: 33,
    genreName: "Australia",
  },
  {
    id: 34,
    genreName: "Avant-Garde",
  },
  {
    id: 35,
    genreName: "Avant-Garde Jazz",
  },
  {
    id: 36,
    genreName: "Axé",
  },
  {
    id: 37,
    genreName: "Baile Funk",
  },
  {
    id: 38,
    genreName: "Baladas y Boleros",
  },
  {
    id: 39,
    genreName: "Baroque Era",
  },
  {
    id: 40,
    genreName: "Bass",
  },
  {
    id: 41,
    genreName: "Bebop",
  },
  {
    id: 42,
    genreName: "Benga",
  },
  {
    id: 43,
    genreName: "Bengali",
  },
  {
    id: 44,
    genreName: "Bhojpuri",
  },
  {
    id: 45,
    genreName: "Big Band",
  },
  {
    id: 46,
    genreName: "Bluegrass",
  },
  {
    id: 47,
    genreName: "Blues",
  },
  {
    id: 48,
    genreName: "Blues/R&B",
  },
  {
    id: 49,
    genreName: "Blues-Rock",
  },
  {
    id: 50,
    genreName: "Bolero",
  },
  {
    id: 51,
    genreName: "Bollywood",
  },
  {
    id: 52,
    genreName: "Bongo-Flava",
  },
  {
    id: 53,
    genreName: "Books & Spoken",
  },
  {
    id: 54,
    genreName: "Bossa Nova",
  },
  {
    id: 55,
    genreName: "Brass & Woodwinds",
  },
  {
    id: 56,
    genreName: "Brazilian",
  },
  {
    id: 57,
    genreName: "Breakbeat",
  },
  {
    id: 58,
    genreName: "British Invasion",
  },
  {
    id: 59,
    genreName: "Britpop",
  },
  {
    id: 60,
    genreName: "C-Pop",
  },
  {
    id: 61,
    genreName: "Cajun",
  },
  {
    id: 62,
    genreName: "Calypso",
  },
  {
    id: 63,
    genreName: "Cantata",
  },
  {
    id: 64,
    genreName: "Cantopop",
  },
  {
    id: 65,
    genreName: "Caribbean",
  },
  {
    id: 66,
    genreName: "Carnatic Classical",
  },
  {
    id: 67,
    genreName: "CCM",
  },
  {
    id: 68,
    genreName: "Cello",
  },
  {
    id: 69,
    genreName: "Celtic",
  },
  {
    id: 70,
    genreName: "Celtic Folk",
  },
  {
    id: 71,
    genreName: "Chachacha",
  },
  {
    id: 72,
    genreName: "Chamber Music",
  },
  {
    id: 73,
    genreName: "Chant",
  },
  {
    id: 74,
    genreName: "Chanukah",
  },
  {
    id: 75,
    genreName: "Chicago Blues",
  },
  {
    id: 76,
    genreName: "Children's Music",
  },
  {
    id: 77,
    genreName: "Chinese",
  },
  {
    id: 78,
    genreName: "Chinese Alt",
  },
  {
    id: 79,
    genreName: "Chinese Classical",
  },
  {
    id: 80,
    genreName: "Chinese Flute",
  },
  {
    id: 81,
    genreName: "Chinese Hip-Hop",
  },
  {
    id: 82,
    genreName: "Chinese Opera",
  },
  {
    id: 83,
    genreName: "Chinese Orchestral",
  },
  {
    id: 84,
    genreName: "Chinese Regional Folk",
  },
  {
    id: 85,
    genreName: "Chinese Rock",
  },
  {
    id: 86,
    genreName: "Chinese Strings",
  },
  {
    id: 87,
    genreName: "Choral",
  },
  {
    id: 88,
    genreName: "Choro",
  },
  {
    id: 89,
    genreName: "Christian & Gospel",
  },
  {
    id: 90,
    genreName: "Christian Metal",
  },
  {
    id: 91,
    genreName: "Christian Pop",
  },
  {
    id: 92,
    genreName: "Christian Rap",
  },
  {
    id: 93,
    genreName: "Christian Rock",
  },
  {
    id: 94,
    genreName: "Christmas",
  },
  {
    id: 95,
    genreName: "Christmas: Children's",
  },
  {
    id: 96,
    genreName: "Christmas: Classic",
  },
  {
    id: 97,
    genreName: "Christmas: Classical",
  },
  {
    id: 98,
    genreName: "Christmas: Jazz",
  },
  {
    id: 99,
    genreName: "Christmas: Modern",
  },
  {
    id: 100,
    genreName: "Christmas: Pop",
  },
  {
    id: 101,
    genreName: "Christmas: R&B",
  },
  {
    id: 102,
    genreName: "Christmas: Religious",
  },
  {
    id: 103,
    genreName: "Christmas: Rock",
  },
  {
    id: 104,
    genreName: "Classic Blues",
  },
  {
    id: 105,
    genreName: "Classic Christian",
  },
  {
    id: 106,
    genreName: "Classical",
  },
  {
    id: 107,
    genreName: "Classical Crossover",
  },
  {
    id: 108,
    genreName: "Classical Era",
  },
  {
    id: 109,
    genreName: "College Rock",
  },
  {
    id: 110,
    genreName: "Comedy",
  },
  {
    id: 111,
    genreName: "Contemporary Bluegrass",
  },
  {
    id: 112,
    genreName: "Contemporary Blues",
  },
  {
    id: 113,
    genreName: "Contemporary Celtic",
  },
  {
    id: 114,
    genreName: "Contemporary Country",
  },
  {
    id: 115,
    genreName: "Contemporary Era",
  },
  {
    id: 116,
    genreName: "Contemporary Folk",
  },
  {
    id: 117,
    genreName: "Contemporary Gospel",
  },
  {
    id: 118,
    genreName: "Contemporary Jazz",
  },
  {
    id: 119,
    genreName: "Contemporary Latin",
  },
  {
    id: 120,
    genreName: "Contemporary R&B",
  },
  {
    id: 121,
    genreName: "Contemporary Singer/Songwriter",
  },
  {
    id: 122,
    genreName: "Cool Jazz",
  },
  {
    id: 123,
    genreName: "Country",
  },
  {
    id: 124,
    genreName: "Country Blues",
  },
  {
    id: 125,
    genreName: "Country Gospel",
  },
  {
    id: 126,
    genreName: "Coupé-Décalé",
  },
  {
    id: 127,
    genreName: "Crossover Jazz",
  },
  {
    id: 128,
    genreName: "Cuban",
  },
  {
    id: 129,
    genreName: "Dabke",
  },
  {
    id: 130,
    genreName: "Dance",
  },
  {
    id: 131,
    genreName: "Dangdut",
  },
  {
    id: 132,
    genreName: "Death Metal/Black Metal",
  },
  {
    id: 133,
    genreName: "Delta Blues",
  },
  {
    id: 134,
    genreName: "Devotional & Spiritual",
  },
  {
    id: 135,
    genreName: "Dini",
  },
  {
    id: 136,
    genreName: "Dirty South",
  },
  {
    id: 137,
    genreName: "Disco",
  },
  {
    id: 138,
    genreName: "Disney",
  },
  {
    id: 139,
    genreName: "Dixieland",
  },
  {
    id: 140,
    genreName: "Doo Wop",
  },
  {
    id: 141,
    genreName: "Downtempo",
  },
  {
    id: 142,
    genreName: "Drinking Songs",
  },
  {
    id: 143,
    genreName: "Dub",
  },
  {
    id: 144,
    genreName: "Dubstep",
  },
  {
    id: 145,
    genreName: "Early Music",
  },
  {
    id: 146,
    genreName: "East Coast Rap",
  },
  {
    id: 147,
    genreName: "Easter",
  },
  {
    id: 148,
    genreName: "Easy Listening",
  },
  {
    id: 149,
    genreName: "Egyptian Hip-Hop",
  },
  {
    id: 150,
    genreName: "Egyptian Pop",
  },
  {
    id: 151,
    genreName: "Egyptian Tarab",
  },
  {
    id: 152,
    genreName: "Electric Blues",
  },
  {
    id: 153,
    genreName: "Electro-Cha'abi",
  },
  {
    id: 154,
    genreName: "Electronic",
  },
  {
    id: 155,
    genreName: "Electronica",
  },
  {
    id: 156,
    genreName: "EMO",
  },
  {
    id: 157,
    genreName: "Enka",
  },
  {
    id: 158,
    genreName: "Environmental",
  },
  {
    id: 159,
    genreName: "Europe",
  },
  {
    id: 160,
    genreName: "Exercise",
  },
  {
    id: 161,
    genreName: "Fado",
  },
  {
    id: 162,
    genreName: "Fantezi",
  },
  {
    id: 163,
    genreName: "Farsi",
  },
  {
    id: 164,
    genreName: "Fitness & Workout",
  },
  {
    id: 165,
    genreName: "Flamenco",
  },
  {
    id: 166,
    genreName: "Folk",
  },
  {
    id: 167,
    genreName: "Folk-Rock",
  },
  {
    id: 168,
    genreName: "Foreign Cinema",
  },
  {
    id: 169,
    genreName: "Forró",
  },
  {
    id: 170,
    genreName: "France",
  },
  {
    id: 171,
    genreName: "French Pop",
  },
  {
    id: 172,
    genreName: "Frevo",
  },
  {
    id: 173,
    genreName: "Funk",
  },
  {
    id: 174,
    genreName: "Fusion",
  },
  {
    id: 175,
    genreName: "Gangsta Rap",
  },
  {
    id: 176,
    genreName: "Garage",
  },
  {
    id: 177,
    genreName: "German Folk",
  },
  {
    id: 178,
    genreName: "German Pop",
  },
  {
    id: 179,
    genreName: "Ghazals",
  },
  {
    id: 180,
    genreName: "Glam Rock",
  },
  {
    id: 181,
    genreName: "Gospel",
  },
  {
    id: 182,
    genreName: "Goth Rock",
  },
  {
    id: 183,
    genreName: "Gqom",
  },
  {
    id: 184,
    genreName: "Grunge",
  },
  {
    id: 185,
    genreName: "Guajira",
  },
  {
    id: 186,
    genreName: "Guaracha",
  },
  {
    id: 187,
    genreName: "Guitar",
  },
  {
    id: 188,
    genreName: "Gujarati",
  },
  {
    id: 189,
    genreName: "Hair Metal",
  },
  {
    id: 190,
    genreName: "Halk",
  },
  {
    id: 191,
    genreName: "Halloween",
  },
  {
    id: 192,
    genreName: "Hard Bop",
  },
  {
    id: 193,
    genreName: "Hard Rock",
  },
  {
    id: 194,
    genreName: "Hardcore",
  },
  {
    id: 195,
    genreName: "Hardcore Rap",
  },
  {
    id: 196,
    genreName: "Haryanvi",
  },
  {
    id: 197,
    genreName: "Hawaii",
  },
  {
    id: 198,
    genreName: "Healing",
  },
  {
    id: 199,
    genreName: "Heavy Metal",
  },
  {
    id: 200,
    genreName: "Highlife",
  },
  {
    id: 201,
    genreName: "Hindustani Classical",
  },
  {
    id: 202,
    genreName: "Hip Hop/Rap",
  },
  {
    id: 203,
    genreName: "Hip-Hop",
  },
  {
    id: 204,
    genreName: "Holiday",
  },
  {
    id: 205,
    genreName: "Holiday: Other",
  },
  {
    id: 206,
    genreName: "Honky Tonk",
  },
  {
    id: 207,
    genreName: "House",
  },
  {
    id: 208,
    genreName: "Iberia",
  },
  {
    id: 209,
    genreName: "IDM/Experimental",
  },
  {
    id: 210,
    genreName: "Impressionist",
  },
  {
    id: 211,
    genreName: "Indian",
  },
  {
    id: 212,
    genreName: "Indian Classical",
  },
  {
    id: 213,
    genreName: "Indian Folk",
  },
  {
    id: 214,
    genreName: "Indian Pop",
  },
  {
    id: 215,
    genreName: "Indie Egyptian",
  },
  {
    id: 216,
    genreName: "Indie Levant",
  },
  {
    id: 217,
    genreName: "Indie Maghreb",
  },
  {
    id: 218,
    genreName: "Indie Pop",
  },
  {
    id: 219,
    genreName: "Indie Rock",
  },
  {
    id: 220,
    genreName: "Indo Pop",
  },
  {
    id: 221,
    genreName: "Indonesian Religious",
  },
  {
    id: 222,
    genreName: "Industrial",
  },
  {
    id: 223,
    genreName: "Inspirational",
  },
  {
    id: 224,
    genreName: "Instrumental",
  },
  {
    id: 225,
    genreName: "Iraqi Folk",
  },
  {
    id: 226,
    genreName: "Iraqi Pop",
  },
  {
    id: 227,
    genreName: "Iraqi Tarab",
  },
  {
    id: 228,
    genreName: "Islamic",
  },
  {
    id: 229,
    genreName: "Israeli",
  },
  {
    id: 230,
    genreName: "J-Pop",
  },
  {
    id: 231,
    genreName: "Jam Bands",
  },
  {
    id: 232,
    genreName: "Japan",
  },
  {
    id: 233,
    genreName: "Japanese Pop",
  },
  {
    id: 234,
    genreName: "Jazz",
  },
  {
    id: 235,
    genreName: "Jungle/Drum'n'bass",
  },
  {
    id: 236,
    genreName: "K-Pop",
  },
  {
    id: 237,
    genreName: "Kannada",
  },
  {
    id: 238,
    genreName: "Karaoke",
  },
  {
    id: 239,
    genreName: "Kayokyoku",
  },
  {
    id: 240,
    genreName: "Khaleeji",
  },
  {
    id: 241,
    genreName: "Khaleeji Folk",
  },
  {
    id: 242,
    genreName: "Khaleeji Hip-Hop",
  },
  {
    id: 243,
    genreName: "Khaleeji Jalsat",
  },
  {
    id: 244,
    genreName: "Khaleeji Pop",
  },
  {
    id: 245,
    genreName: "Khaleeji Shailat",
  },
  {
    id: 246,
    genreName: "Khaleeji Tarab",
  },
  {
    id: 247,
    genreName: "Kizomba",
  },
  {
    id: 248,
    genreName: "Klezmer",
  },
  {
    id: 249,
    genreName: "Korean",
  },
  {
    id: 250,
    genreName: "Korean Folk-Pop",
  },
  {
    id: 251,
    genreName: "Korean Hip-Hop",
  },
  {
    id: 252,
    genreName: "Korean Indie",
  },
  {
    id: 253,
    genreName: "Korean Rock",
  },
  {
    id: 254,
    genreName: "Korean Trad Instrumental",
  },
  {
    id: 255,
    genreName: "Korean Trad Song",
  },
  {
    id: 256,
    genreName: "Korean Trad Theater",
  },
  {
    id: 257,
    genreName: "Korean Traditional",
  },
  {
    id: 258,
    genreName: "Kuduro",
  },
  {
    id: 259,
    genreName: "Kwaito",
  },
  {
    id: 260,
    genreName: "Latin",
  },
  {
    id: 261,
    genreName: "Latin Jazz",
  },
  {
    id: 262,
    genreName: "Latin Rap",
  },
  {
    id: 263,
    genreName: "Latin Urban",
  },
  {
    id: 264,
    genreName: "Levant",
  },
  {
    id: 265,
    genreName: "Levant Electronic",
  },
  {
    id: 266,
    genreName: "Levant Hip-Hop",
  },
  {
    id: 267,
    genreName: "Levant Pop",
  },
  {
    id: 268,
    genreName: "Lounge",
  },
  {
    id: 269,
    genreName: "Lovers Rock",
  },
  {
    id: 270,
    genreName: "Lullabies",
  },
  {
    id: 271,
    genreName: "Maghreb Dance",
  },
  {
    id: 272,
    genreName: "Maghreb Electronic",
  },
  {
    id: 273,
    genreName: "Maghreb Hip-Hop",
  },
  {
    id: 274,
    genreName: "Maghreb Pop",
  },
  {
    id: 275,
    genreName: "Maghreb Rai",
  },
  {
    id: 276,
    genreName: "Mainstream Jazz",
  },
  {
    id: 277,
    genreName: "Malayalam",
  },
  {
    id: 278,
    genreName: "Malaysian Pop",
  },
  {
    id: 279,
    genreName: "Mambo",
  },
  {
    id: 280,
    genreName: "Mandopop",
  },
  {
    id: 281,
    genreName: "Manilla Sound",
  },
  {
    id: 282,
    genreName: "Marathi",
  },
  {
    id: 283,
    genreName: "Marching Bands",
  },
  {
    id: 284,
    genreName: "Maskandi",
  },
  {
    id: 285,
    genreName: "Mbalax",
  },
  {
    id: 286,
    genreName: "Medieval Era",
  },
  {
    id: 287,
    genreName: "Meditation",
  },
  {
    id: 288,
    genreName: "Minimalism",
  },
  {
    id: 289,
    genreName: "Modern Dancehall",
  },
  {
    id: 290,
    genreName: "Modern Era",
  },
  {
    id: 291,
    genreName: "Motown",
  },
  {
    id: 292,
    genreName: "MPB",
  },
  {
    id: 293,
    genreName: "Music",
  },
  {
    id: 294,
    genreName: "Musicals",
  },
  {
    id: 295,
    genreName: "Nature",
  },
  {
    id: 296,
    genreName: "Ndombolo",
  },
  {
    id: 297,
    genreName: "Neo-Soul",
  },
  {
    id: 298,
    genreName: "New Acoustic",
  },
  {
    id: 299,
    genreName: "New Age",
  },
  {
    id: 300,
    genreName: "New Wave",
  },
  {
    id: 301,
    genreName: "North African",
  },
  {
    id: 302,
    genreName: "North America",
  },
  {
    id: 303,
    genreName: "Novelty",
  },
  {
    id: 304,
    genreName: "Odia",
  },
  {
    id: 305,
    genreName: "Old School Rap",
  },
  {
    id: 306,
    genreName: "Oldies",
  },
  {
    id: 307,
    genreName: "Opera",
  },
  {
    id: 308,
    genreName: "Oratorio",
  },
  {
    id: 309,
    genreName: "Orchestral",
  },
  {
    id: 310,
    genreName: "Original Pilipino Music",
  },
  {
    id: 311,
    genreName: "Original Score",
  },
  {
    id: 312,
    genreName: "Outlaw Country",
  },
  {
    id: 313,
    genreName: "Özgün",
  },
  {
    id: 314,
    genreName: "Pagode",
  },
  {
    id: 315,
    genreName: "Percussion",
  },
  {
    id: 316,
    genreName: "Piano",
  },
  {
    id: 317,
    genreName: "Pinoy Pop",
  },
  {
    id: 318,
    genreName: "Polka",
  },
  {
    id: 319,
    genreName: "Pop",
  },
  {
    id: 320,
    genreName: "Pop in Spanish",
  },
  {
    id: 321,
    genreName: "Pop Punk",
  },
  {
    id: 322,
    genreName: "Pop/Rock",
  },
  {
    id: 323,
    genreName: "Praise & Worship",
  },
  {
    id: 324,
    genreName: "Prog-Rock/Art Rock",
  },
  {
    id: 325,
    genreName: "Psychedelic",
  },
  {
    id: 326,
    genreName: "Punjabi",
  },
  {
    id: 327,
    genreName: "Punjabi Pop",
  },
  {
    id: 328,
    genreName: "Punk",
  },
  {
    id: 329,
    genreName: "Quiet Storm",
  },
  {
    id: 330,
    genreName: "R&B/Soul",
  },
  {
    id: 331,
    genreName: "Rabindra Sangeet",
  },
  {
    id: 332,
    genreName: "Ragtime",
  },
  {
    id: 333,
    genreName: "Raices",
  },
  {
    id: 334,
    genreName: "Rajasthani",
  },
  {
    id: 335,
    genreName: "Rap",
  },
  {
    id: 336,
    genreName: "Reggae",
  },
  {
    id: 337,
    genreName: "Regional Indian",
  },
  {
    id: 338,
    genreName: "Regional Mexicano",
  },
  {
    id: 339,
    genreName: "Relaxation",
  },
  {
    id: 340,
    genreName: "Religious",
  },
  {
    id: 341,
    genreName: "Renaissance",
  },
  {
    id: 342,
    genreName: "Rock",
  },
  {
    id: 343,
    genreName: "Rock & Roll",
  },
  {
    id: 344,
    genreName: "Rockabilly",
  },
  {
    id: 345,
    genreName: "Romantic Era",
  },
  {
    id: 346,
    genreName: "Roots Reggae",
  },
  {
    id: 347,
    genreName: "Roots Rock",
  },
  {
    id: 348,
    genreName: "Russian",
  },
  {
    id: 349,
    genreName: "Russian Bard",
  },
  {
    id: 350,
    genreName: "Russian Chanson",
  },
  {
    id: 351,
    genreName: "Russian Hip-Hop",
  },
  {
    id: 352,
    genreName: "Russian Pop",
  },
  {
    id: 353,
    genreName: "Russian Rock",
  },
  {
    id: 354,
    genreName: "Russian Romance",
  },
  {
    id: 355,
    genreName: "Sacred",
  },
  {
    id: 356,
    genreName: "Salsa y Tropical",
  },
  {
    id: 357,
    genreName: "Samba",
  },
  {
    id: 358,
    genreName: "Sanat",
  },
  {
    id: 359,
    genreName: "Sertanejo",
  },
  {
    id: 360,
    genreName: "Shangaan Electro",
  },
  {
    id: 361,
    genreName: "Shows",
  },
  {
    id: 362,
    genreName: "Sing-Along",
  },
  {
    id: 363,
    genreName: "Singer/Songwriter",
  },
  {
    id: 364,
    genreName: "Ska",
  },
  {
    id: 365,
    genreName: "Smooth Jazz",
  },
  {
    id: 366,
    genreName: "Soca",
  },
  {
    id: 367,
    genreName: "Soft Rock",
  },
  {
    id: 368,
    genreName: "Solo Instrumental",
  },
  {
    id: 369,
    genreName: "Son",
  },
  {
    id: 370,
    genreName: "Soukous",
  },
  {
    id: 371,
    genreName: "Soul",
  },
  {
    id: 372,
    genreName: "Sound Effects",
  },
  {
    id: 373,
    genreName: "Soundtrack",
  },
  {
    id: 374,
    genreName: "South Africa",
  },
  {
    id: 375,
    genreName: "South America",
  },
  {
    id: 376,
    genreName: "Southern Gospel",
  },
  {
    id: 377,
    genreName: "Southern Rock",
  },
  {
    id: 378,
    genreName: "Spoken Word",
  },
  {
    id: 379,
    genreName: "Standards",
  },
  {
    id: 380,
    genreName: "Standup Comedy",
  },
  {
    id: 381,
    genreName: "Stories",
  },
  {
    id: 382,
    genreName: "Sufi",
  },
  {
    id: 383,
    genreName: "Surf",
  },
  {
    id: 384,
    genreName: "Swing",
  },
  {
    id: 385,
    genreName: "Taarab",
  },
  {
    id: 386,
    genreName: "Tai-Pop",
  },
  {
    id: 387,
    genreName: "Taiwanese Folk",
  },
  {
    id: 388,
    genreName: "Tamil",
  },
  {
    id: 389,
    genreName: "Tango",
  },
  {
    id: 390,
    genreName: "Tarab",
  },
  {
    id: 391,
    genreName: "Techno",
  },
  {
    id: 392,
    genreName: "Teen Pop",
  },
  {
    id: 393,
    genreName: "Telugu",
  },
  {
    id: 394,
    genreName: "Tex-Mex",
  },
  {
    id: 395,
    genreName: "Thai Country",
  },
  {
    id: 396,
    genreName: "Thai Pop",
  },
  {
    id: 397,
    genreName: "Thanksgiving",
  },
  {
    id: 398,
    genreName: "Tibetan Native Music",
  },
  {
    id: 399,
    genreName: "Timba",
  },
  {
    id: 400,
    genreName: "Trad Jazz",
  },
  {
    id: 401,
    genreName: "Traditional Bluegrass",
  },
  {
    id: 402,
    genreName: "Traditional Celtic",
  },
  {
    id: 403,
    genreName: "Traditional Country",
  },
  {
    id: 404,
    genreName: "Traditional Folk",
  },
  {
    id: 405,
    genreName: "Traditional Gospel",
  },
  {
    id: 406,
    genreName: "Traditional Pop",
  },
  {
    id: 407,
    genreName: "Trance",
  },
  {
    id: 408,
    genreName: "Travel",
  },
  {
    id: 409,
    genreName: "Trot",
  },
  {
    id: 410,
    genreName: "Turkish",
  },
  {
    id: 411,
    genreName: "Turkish Alternative",
  },
  {
    id: 412,
    genreName: "Turkish Hip-Hop/Rap",
  },
  {
    id: 413,
    genreName: "Turkish Pop",
  },
  {
    id: 414,
    genreName: "Turkish Rock",
  },
  {
    id: 415,
    genreName: "TV Soundtrack",
  },
  {
    id: 416,
    genreName: "UK Hip Hop",
  },
  {
    id: 417,
    genreName: "Unclassifiable",
  },
  {
    id: 418,
    genreName: "Underground Rap",
  },
  {
    id: 419,
    genreName: "Urban Cowboy",
  },
  {
    id: 420,
    genreName: "Urdu",
  },
  {
    id: 421,
    genreName: "Video Game",
  },
  {
    id: 422,
    genreName: "Violin",
  },
  {
    id: 423,
    genreName: "Vocal",
  },
  {
    id: 424,
    genreName: "Vocal Jazz",
  },
  {
    id: 425,
    genreName: "Vocal Pop",
  },
  {
    id: 426,
    genreName: "Wedding Music",
  },
  {
    id: 427,
    genreName: "West Coast Rap",
  },
  {
    id: 428,
    genreName: "World",
  },
  {
    id: 429,
    genreName: "Worldbeat",
  },
  {
    id: 430,
    genreName: "Yoga",
  },
  {
    id: 431,
    genreName: "Zouglou",
  },
  {
    id: 432,
    genreName: "Zydeco",
  },
];

export default genreList;
