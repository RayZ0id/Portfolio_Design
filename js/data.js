/* ═══════════════════════════════════════════════════════════════
   RaynardOS — Category & Portfolio Data
   js/data.js

   ITEM FIELDS
   ───────────
   name    display name                                   (required)
   tag     small grey label (year / status)               (required)
   ico     fallback emoji when image/video is missing     (required)
   desc    description shown in detail window             (optional)

   --- IMAGE ---
   img     filename inside  portfolio/<cat-id>/           (optional, defaults to slug.jpg)

   --- YOUTUBE VIDEO ---
   type: 'youtube'
   link    full YouTube URL  e.g. 'https://youtu.be/XYZ'  (required for embed)
   img     thumbnail filename inside portfolio/<cat-id>/  (optional)

   --- DIRECT MP4 (lazy-load, plays when window is active) ---
   type: 'video'
   video   mp4 path inside  portfolio/<cat-id>/           (required)
   img     poster/thumbnail filename for the grid card    (optional)

   --- IMAGE GALLERY (multiple images, one project) ---
   type: 'gallery'
   img     cover image shown in grid                      (required)
   gallery array of filenames inside portfolio/<cat-id>/  (required)
════════════════════════════════════════════════════════════════ */

const CATS = [

  /* ── VIDEO ──────────────────────────────────────────────────
     Grid shows thumbnail. Click opens detail window with
     a YouTube embed (or a "no link yet" placeholder).
  ────────────────────────────────────────────────────────── */
  {
    id:   'video',
    name: 'Video',
    ico:  '🎬',
    desc: 'Video Production & Editing',
    bg:   '#001525',
    items: [

      {
        name: 'The Sea Sang To Us',
        tag:  '2026',
        ico:  '▶',
        type: 'youtube',
        link: 'https://youtu.be/nH10Xe134p0',
        img:  'The Sea Sang To Us/Poster.png',
        software: 'Software used: Blender, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc: 'This is a VR Short film project that I worked on as a Director and VFX artist. Most Shots were created using Blender, with additional editing and compositing in Adobe Premiere Pro and After Effects. The project was a collaborative effort, and I contributed to the direction, visual effects, and overall post-production process. The film explores themes of cencorship and the power of storytelling, set against the backdrop of a dystopian future.'
      },

      {
        name: '.Mata',
        tag:  '2023',
        ico:  '▶',
        type: 'youtube',
        link: 'https://youtu.be/vu_yPBoXI7o',                                  
        img:  '.Mata/.Mata Thumbnail.png',
        software: 'Software used: Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc: '.Mata is a short film project that I edited for a friend. The film was shot on location in Jakarta, and I was responsible for the post-production process, including editing, color grading, and visual effects. The project was a collaborative effort, and I worked closely with the person to bring their vision to life. The film explores themes of nature, identity, and transformation.'
      },

      {
        name: 'Arizona VFX Ad',
        tag:  '2025',
        ico:  '▶',
        type: 'youtube',
        link: 'https://youtu.be/rTsl31plvhQ',                                   
        img:  'Arizona AD/ARIZONA VFX -.png',
        software: 'Software used: Blender, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc: 'This is a concept advertisement video for Arizona Iced Tea, created as a personal project to explore VFX techniques. The video features dynamic product shots and visual effects to create an engaging and visually appealing ad. I used Blender for 3D modeling and animation, and Adobe Premiere Pro and After Effects for editing and compositing. The project was a fun experiment in blending product visualization with creative VFX to showcase the brand in a unique way.'
      },

      {
        name: 'In Purgatory',
        tag:  '2019',
        ico:  '▶',
        type: 'youtube',
        link: 'https://youtu.be/nLqaFO_9L5A',                                   
        img:  'In Purgatory/In Purgatory.jpg',
        software: 'Software used: Ebsynth, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc: 'A short film exploring themes of isolation and redemption in a post-apocalyptic world. This was a personal project short film idea to be pitched where I experimented with rotoscoping techniques using Ebsynth, combined with traditional editing and compositing in Adobe Premiere Pro and After Effects. The film was a creative outlet for me to explore storytelling through visual effects and post-production.'
      }
    ]
  },

  /* ── ANIMATION ──────────────────────────────────────────────
     Grid cards show a muted video preview that lazy-loads
     when the window opens. Click opens detail with full player.
  ────────────────────────────────────────────────────────── */
  {
    id:   'animation',
    name: 'Animation',
    ico:  '✨',
    desc: '2D Animation & Motion Graphics',
    bg:   '#001225',
    items: [

      {
        name:  'Cube Projection',
        tag:   '2025',
        ico:   '✦',
        type:  'video',
        video: 'Cube Projection Project/(BARRR) final scene_Hot Fix_Show.mp4',
        videos: [
        { label: 'With Canvas',   src: 'Cube Projection Project/(BARRR) final scene_Hot Fix_3 With canvas.mp4' },
        { label: 'Show Version',  src: 'Cube Projection Project/(BARRR) final scene_Hot Fix_Show.mp4' }
  ],
        
      software: 'Software used: Blender, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
      desc:  'A projection-mapping / 3D animation project exploring the intersection of digital art and physical space. this was showing for the indonesian wakening day event. we were tasked to reimagine storytelling through the creative lens of motion graphics and projection mapping while embracing the spirit of Indonesian Awakening Day —a pivotal moment in the nation\'s history that symbolizes the birth of national awareness, unity, and the fight for independence. '
      },

      {
        name:  'Ocean Loop',
        tag:   '2025',
        ico:   '✦',
        type:  'video',
        video: 'Ocean Loop/Ocean Animation loop -asset.mp4',
        software: 'Software used: Blender.',
        desc:  'A seamlessly looping ocean animation. For an assignment exploring procedural animation techniques, I created this ocean loop using Blender\'s shaders and animation tools.'
      },

      {
        name:  'PRIME Concept Ad',
        tag:   '2025',
        ico:   '✦',
        type:  'video',
        video: 'PRIME ad/PRIME CONCEPT AD.mp4',
        software: 'Software used: Adobe After Effects.',
        img:   'PRIME ad/Prime_Hydration_logo.png',
        software: 'Software used: Blender, Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc:  'A concept advertisement animation for PRIME Hydration. This was a group project where we created a concept ad for PRIME Hydration, using Adobe After Effects for the animation and compositing. My part involved the first 2 shots and last shot of the advertisment, where I animated the product and created the final reveal.'
      },

      {
        name:  'Walk Cycle',
        tag:   '2025',
        ico:   '✦',
        type:  'video',
        video: 'Walk Cycle/Exercise 2 - Walk Cycle Animation - Raynard.mp4',
        software: 'Software used: Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop.',
        desc:  'A character walk cycle animation exercise. this was an assignment for an animation class where we had to create a walk cycle for a character. I used Adobe Premiere Pro and After Effects to animate the character\'s movement under strict time.'
      },

      {
        name:  'Wallpaper Commission',
        tag:   '2020',
        ico:   '✦',
        type:  'video',
        video: 'Wallpaper Comission/Eva 01 - Brando Chiesa - After Animation.mp4',
        img:   'Wallpaper Comission/Eva 01 - Brando Chiesa - Before Animation.jpg',
        software: 'Software used: Adobe After Effects, Adobe Photoshop.',
        desc:  'A commissioned animated wallpaper for a client — Eva Unit 01 fan art, brought to life. the client wanted the wallpaper to be animated it breathing and have some subtle movement. I used Adobe After Effects to create the animation.'
      }
    ]
  },

  /* ── 3D ─────────────────────────────────────────────────────
     Arizona Product Shots is a gallery of 4 renders.
     BMW and Donuts are single images.
  ────────────────────────────────────────────────────────── */
  {
    id:   '3d',
    name: '3D',
    ico:  '🔷',
    desc: '3D Modeling, Rendering & VFX',
    bg:   '#001a20',
    items: [

      {
        name:    'Arizona Product Shots',
        tag:     '2025',
        ico:     '◈',
        type:    'gallery',
        img:     'Arizona Product Shots/Product Shot.png',
        gallery: [
          'Arizona Product Shots/Product Shot.png',
          'Arizona Product Shots/Product Shot 1.2 .png',
          'Arizona Product Shots/Product Shot 2.png',
          'Arizona Product Shots/Product Shot 2.2 .png'
        ],
        software: 'Software used: Blender',
        desc: 'Product visualisation renders for Arizona Iced Tea. this was for the Arizona VFX Ad project in the video section, where I created these product shots using Blender to be used in the concept advertisement video.'
      },

      {
        name: 'BMW E30 Commission',
        tag:  '2019',
        ico:  '◈',
        img:  'BMW E30 Commsion/BMW E30.png',
        software: 'Software used: Blender, Adobe Photoshop.',
        desc: 'A commissioned 3D render of a BMW E30. This was a clien\'s project where I created a 3D model of a BMW E30 using Blender, and then rendered it with cartoon-style materials. I also did some post-processing in Adobe Photoshop to enhance the final image.'
      },

      {
        name: 'Donuts',
        tag:  '2024',
        ico:  '◈',
        img:  'Donuts/Donut - Raynard .png',
        software: 'Software used: Blender',
        desc: 'The classic Blender beginner donut — Raynard\'s take. this was an assigment for a 3D modeling class where we had to create a donut using Blender. I added my own flair to the classic donut by experimenting with different materials and lighting setups to create a unique render.'
      }
    ]
  },

  /* ── GAMES ──────────────────────────────────────────────── */
  {
    id:   'games',
    name: 'Games',
    ico:  '🎮',
    desc: 'Game Development Projects',
    bg:   '#001010',
    items: [

      {
        name: 'Magical Girl Vs Eldritch Horrors',
        tag:  '2026',
        ico:  '◉',
        img:  'Magical Girl Vs Eldritch Horrors.png',
        link: 'https://drive.google.com/file/d/1Myv0hg8-fVZcRGbe68uJSkMbQcwWhDQZ/view?usp=drive_link',                
        software: 'Software used: Godot 4.6.1, Blender, Adobe Photoshop.',                  
        desc: 'This is an original 3D action game developed in Godot 4.6.1 as part of an academic research project exploring constraint-based game design. Built by a first-time developer over approximately one month. The game pits a magical girl protagonist against a roster of Lovecraftian bosses, beginning with Cthulhu, each designed with multi-phase behavior, escalating aggression, and distinct attack patterns that teach the player the three core mechanics progressively. The the project takes direct inspiration from minimalist boss-rush structure of Shadow of the Colossus. stripping gameplay down to its essentials: a light attack, a charge-release heavy attack, and a parry system. While the project reached only an alpha stage due to time limitations, as it explores the main thesis of the project, witch is to explore the foundational optimization principles, applied deliberately by an inexperienced developer, can produce a coherent, and a functional game.'
      },

      {
        name: 'Mother Of The Deep',
        tag:  '2026',
        ico:  '◉',
        img:  'Mother Of The Deep.png',
        link: 'https://drive.google.com/file/d/1ktuqc18rS-9vUMlEW3-p-u0yjIDVEK9B/view?usp=sharing',                                   
        software: 'Software used: Blender, Adobe Photoshop.',
        desc: 'A dark atmospheric game set in the depths of the ocean. Uncover the mystery of the Mother Of The Deep as you navigate haunting underwater environments. [Add engine, team size, and development notes.]'
      }
    ]
  },

  /* ── POSTERS ─────────────────────────────────────────────── */
  {
    id:   'posters',
    name: 'Posters',
    ico:  '🖼',
    desc: 'Poster & Print Design',
    bg:   '#1a1500',
    items: [

      {
        name: 'A Future Consumed',
        tag:  '2024',
        ico:  '▣',
        img:  'A future Consumed.png',
        software: 'Software used: Blender, Adobe Photoshop, Adobe Illustrator.',
        desc: 'A poster design exploring themes of consumerism and environmental degradation. This was a class showing project where we had to create a poster that conveys a message about a social issue. to be in a mini-booth exhibition. The ussage of 3D elements in the poster was to create the background and add depth to the design, while Adobe Illustrator was used for the typography and layout. '
      },

      {
        name: 'Musical Poster',
        tag:  '2024',
        ico:  '▣',
        img:  'Musical Poster.png',
        software: 'Software used: Adobe Illustrator.',
        desc: 'This was a poster design for a musical mall event. The client wanted a vibrant and eye-catching poster to promote the event, which featured a mix of typography and graphic elements. I used Adobe Illustrator to create the design, focusing on bold colors and dynamic composition to capture the energy of the musical performance.'
      },

      {
        name: 'Groundhog Day',
        tag:  '2024',
        ico:  '▣',
        img:  'Raynard - 2023410002 - Groundhog Day.png',
        software: 'Software used: Adobe Photoshop.',
        desc: 'This is a poster design inspired by the movie Groundhog Day. This is a class project where we had to create a movie poster for an exibtion resons to be held in the school. I used Adobe Photoshop to create the design.'
      },

      {
        name: 'SpaceMan',
        tag:  '2021',
        ico:  '▣',
        img:  'SpaceMan.png',
        software: 'Software used: Adobe Photoshop.',
        desc: 'This was a poster design was sold to a person for 500k IDR. as a commission. The client wanted a space-themed poster with a surreal and dreamy aesthetic. I used Adobe Photoshop to create the design, incorporating elements of space and fantasy to create a visually striking poster.'
      },

      {
        name: 'PX Street Art',
        tag:  '2021',
        ico:  '▣',
        img:  'px streert art.jpg',
        software: 'Software used: Adobe Photoshop.',
        desc: 'This is a Pixel Art piece. I used Adobe Photoshop to create the design based on a videogame interstate drifter 1999 and sold for 100k IDR.'
      }
    ]
  },

  /* ── PHOTOGRAPHY ─────────────────────────────────────────── */
  {
    id:   'photography',
    name: 'Photography',
    ico:  '📷',
    desc: 'Photography & Visual Stories',
    bg:   '#000a1a',
    items: [

      {
        name: 'Background',
        tag:  '2018',
        ico:  '◎',
        img:  'Background.JPG',
        desc: 'This was shot whith a Canon EOS 550D, using a 50mm f/5.6 lens infront of a shiny metal surface to make a interesting bokeh effect. '
      },

      {
        name: 'Colors',
        tag:  '2018',
        ico:  '◎',
        img:  'Colors.JPG',
        desc: 'This was shot with a Canon EOS 550D, using a 39mm f/19 lens. The crayons was arranged to look like a rainbow and photographed to be a background.'
      },

      {
        name: 'Dino in Time',
        tag:  '2019',
        ico:  '◎',
        img:  'Dino in Time.JPG',
        desc: 'This was shot with a Canon EOS M50m2, using a 45mm f/2 lens. The shot was inspired by jursic park that has a misquto in embreo infront of a LCD screen with the color red for contrast.'
      },

      {
        name: 'Fight',
        tag:  '2024',
        ico:  '◎',
        img:  'Fight.jpg',
        desc: 'This was shot with a Canon EOS M50m2, using a 22mm f/6.3 lens. The shot was inspired by The Hidden Fortress that has a samurai esc charaters infront of a LCD screen with the color red for contrast.'
      },

      {
        name: 'Food',
        tag:  '2020',
        ico:  '◎',
        img:  'Food.JPG',
        desc: 'This was shot with a Canon EOS 550D, using a 39mm f/5.6 lens. The food lookd and cool and was photographed to be a background.'
      },

      {
        name: 'Friends',
        tag:  '2024',
        ico:  '◎',
        img:  'Friends.jpg',
        desc: 'This was shot with a Canon EOS M50m2 f/5.6 lens. The shot was my friends watching the jakep paul vs tyson fight on a LCD screen in a dark room.'
      },

      {
        name: 'Home View',
        tag:  '2024',
        ico:  '◎',
        img:  'Home View.jpg',
        desc: 'This was captured with a Canon EOS 550D, using a 35mm f/5.5 lens. this is a view from my home that I found interesting and wanted to capture the mood.'
      },

      {
        name: 'Untitled',
        tag:  '2019',
        ico:  '◎',
        img:  'IMG_3187.JPG',
        desc: 'This was captured with a Canon EOS 550D, using a 18mm f/3.5 lens with 1/60 of exposure time. I wanted to capture the rain at the time and the mood of the rain.'
      },

      {
        name: 'Maria',
        tag:  '2024',
        ico:  '◎',
        img:  'Maria.jpg',
        desc: 'This was shot with a Canon EOS M50m2 using a 45mm f/6.3 lens. this is a portrait of maria form the cristian faith holding jesus statue with in fornt of the LCD screen as background. '
      },

      {
        name: 'Leaving',
        tag:  '2024',
        ico:  '◎',
        img:  'leaving.jpg',
        desc: 'This was shot with a Canon EOS M50m2 using a 22mm f/3.5 lens. this is a portrait of a person leaving a place. '
      }
    ]
  }

];
