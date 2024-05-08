import { v4 as uuid } from "uuid";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({ node: "http://localhost:9200" });

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "BlogNotFound";
const usersCollectionName = "users";
const blogsCollectionName = "blogs";

const userUuids = Array.from({ length: 7 }, () => uuid());
const blogUuids = Array.from({ length: 21 }, () => uuid());

const users = [
  {
    _id: userUuids[0],
    fname: "Walter",
    lname: "White",
    email: "walter@example.com",
    password: "Walter@123",
    bio: "High school chemistry teacher turned methamphetamine manufacturer.",
    followers: [],
    following: [],
    saved: [
      blogUuids[4],
      blogUuids[11],
      blogUuids[13],
      blogUuids[8],
      blogUuids[7],
    ],
  },
  {
    _id: userUuids[1],
    fname: "Tony",
    lname: "Soprano",
    email: "tony@example.com",
    password: "Tony@123",
    bio: "New Jersey mob boss trying to balance family life and organized crime.",
    followers: [],
    following: [],
    saved: [
      blogUuids[1],
      blogUuids[12],
      blogUuids[10],
      blogUuids[6],
      blogUuids[3],
    ],
  },
  {
    _id: userUuids[2],
    fname: "Tyrion",
    lname: "Lannister",
    email: "tyrion@example.com",
    password: "Tyrion@123",
    bio: "Clever and resourceful noble known for his wit and strategic thinking.",
    followers: [],
    following: [],
    saved: [
      blogUuids[0],
      blogUuids[1],
      blogUuids[2],
      blogUuids[17],
      blogUuids[19],
    ],
  },
  {
    _id: userUuids[3],
    fname: "Jesse",
    lname: "Pinkman",
    email: "jesse@example.com",
    password: "Jesse@123",
    bio: "Former meth manufacturer partnering with Heisenberg. Calls everyone 'Yo.'",
    followers: [],
    following: [],
    saved: [blogUuids[13], blogUuids[8]],
  },
  {
    _id: userUuids[4],
    fname: "Rick",
    lname: "Sanchez",
    email: "rick@example.com",
    password: "Rick@123",
    bio: "Genius scientist with a penchant for interdimensional adventures.",
    followers: [],
    following: [],
    saved: [
      blogUuids[0],
      blogUuids[3],
      blogUuids[7],
      blogUuids[6],
      blogUuids[14],
      blogUuids[20],
    ],
  },
  {
    _id: userUuids[5],
    fname: "Carmela",
    lname: "Soprano",
    email: "carmela@example.com",
    password: "Carmela@123",
    bio: "Dedicated wife to a mob boss, striving to maintain family values in a complicated world.",
    followers: [],
    following: [],
    saved: [blogUuids[5], blogUuids[10], blogUuids[15]],
  },
  {
    _id: userUuids[6],
    fname: "Jon",
    lname: "Snow",
    email: "jon@example.com",
    password: "Jonjon@123",
    bio: "Former Lord Commander of the Night's Watch with a claim to the Iron Throne.",
    followers: [],
    following: [],
    saved: [
      blogUuids[1],
      blogUuids[12],
      blogUuids[10],
      blogUuids[6],
      blogUuids[3],
    ],
  },
];

const blogs = [
  {
    _id: blogUuids[0],
    image: "https://blognotf.s3.amazonaws.com/images/dogs1.jpg",
    title: "The Heartwarming Bond Between Humans and Dogs",
    content: `<p>Dogs hold a special place in our hearts, woven into the very fabric of human history as loyal companions, steadfast protectors, and beloved family members. The bond between humans and dogs transcends mere companionship; it's a connection built on trust, love, and unwavering loyalty.</p>
    <p><strong>Unconditional Love:</strong> One of the most beautiful aspects of having a dog is experiencing their unconditional love. No matter the circumstances, a dog's love remains steadfast and unwavering. They greet us with joyous tail wags and warm snuggles, reminding us of the simple pleasures in life.</p>
    <p><em>“The world would be a nicer place if everyone had the ability to love as unconditionally as a dog.”</em> - M.K. Clinton</p>
    <p><strong>Emotional Support:</strong> Dogs have an incredible ability to sense our emotions. They are there to comfort us during times of sadness, provide companionship when we're lonely, and offer a listening ear (or rather, a listening bark) when we need to vent. Their empathetic nature makes them invaluable emotional support animals.</p>
    <p><u>Scientific studies</u> have shown that interacting with dogs can reduce stress levels, lower blood pressure, and increase feelings of happiness and well-being.</p>
    <p><strong>Companionship and Adventure:</strong> Whether it's a leisurely stroll through the park or an exciting hike in the mountains, dogs make every moment an adventure. They are our faithful companions on life's journey, always by our side through thick and thin.</p>
    <p><em>“The journey of life is sweeter when traveled with a dog.”</em> - Unknown</p>
    <p><strong>Training and Responsibility:</strong> Owning a dog also comes with responsibilities. Training them not only teaches them important skills but also strengthens the bond between human and canine. It fosters communication, mutual understanding, and builds trust.</p>
    <p><s>However, it's important to remember that</s> owning a dog is a lifelong commitment that requires <s>dedication</s> <em>dedication,</em> patience, and <u>consistent care</u>.</p>
    <p><strong>Conclusion:</strong> The bond between humans and dogs is truly remarkable, filled with love, companionship, and shared adventures. They teach us valuable lessons about loyalty, compassion, and living in the moment. As we cherish our furry friends, let's also remember to <u>give back</u> by providing them with the love and care they deserve.</p>
    <p><em>“A dog is the only thing on earth that loves you more than he loves himself.”</em> - Josh Billings</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[0], userUuids[3], userUuids[6]],
    userId: userUuids[0],
    tag: "dogs",
  },
  {
    _id: blogUuids[1],
    image: "https://blognotf.s3.amazonaws.com/images/dogs2.jpg",
    title:
      "The Healing Power of Dogs: How Man's Best Friend Improves Mental Health",
    content: `<p>Dogs have long been revered as man's best friend, but their impact on our mental health goes far beyond mere companionship. These furry companions have a remarkable ability to heal, soothe, and uplift our spirits in times of need. Let's delve into the healing power of dogs and how they positively influence our mental well-being.</p>
    <p><strong>Stress Reduction:</strong> Interacting with dogs has been proven to reduce stress levels significantly. Whether it's petting a dog, playing fetch, or simply enjoying their company, the release of oxytocin (the "love hormone") and endorphins during these interactions can create a calming effect, lowering anxiety and promoting relaxation.</p>
    <p><em>“Happiness is a warm puppy.”</em> - Charles M. Schulz</p>
    <p><strong>Emotional Support Animals:</strong> Dogs are widely recognized as emotional support animals due to their innate ability to sense and respond to our emotions. They provide comfort during times of sadness, offer a non-judgmental ear to listen, and act as a source of unconditional love and acceptance.</p>
    <p><u>Therapy dogs</u> are specifically trained to provide support in various settings, such as hospitals, schools, and nursing homes, where their presence has a profound impact on people's emotional well-being.</p>
    <p><strong>Combatting Loneliness:</strong> For those experiencing feelings of loneliness or isolation, having a dog can be incredibly beneficial. Dogs thrive on companionship and are always eager to be by our side, offering companionship, laughter, and a sense of purpose.</p>
    <p><em>“The greatest fear dogs know is the fear that you will not come back when you go out the door without them.”</em> - Stanley Coren</p>
    <p><strong>Encouraging Physical Activity:</strong> Dogs are natural motivators when it comes to staying active. Whether it's going for a daily walk, playing fetch in the backyard, or engaging in agility training, dogs encourage us to get moving and enjoy the outdoors, which in turn boosts our mood and overall well-being.</p>
    <p><strong>Therapeutic Benefits:</strong> The presence of dogs has been shown to have therapeutic benefits for individuals dealing with mental health conditions such as depression, PTSD, and anxiety disorders. Their nonverbal communication, affectionate nature, and ability to provide a sense of security can be profoundly healing.</p>
    <p><em>“Dogs have a way of finding the people who need them and filling an emptiness we didn't even know we had.”</em> - Thom Jones</p>
    <p><strong>Conclusion:</strong> Dogs are not just pets; they are invaluable companions that contribute to our mental, emotional, and physical well-being. Their unconditional love, unwavering loyalty, and therapeutic presence remind us of the profound impact animals can have on our lives. As we celebrate the bond between humans and dogs, let's also acknowledge and appreciate the healing power they bring into our world.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[1], userUuids[4], userUuids[2]],
    userId: userUuids[0],
    tag: "dogs",
  },
  {
    _id: blogUuids[2],
    image: "https://blognotf.s3.amazonaws.com/images/dogs3.jpg",
    title:
      "The Wonders of Canine Intelligence: Exploring the Cleverness of Dogs",
    content: `<p>Behind those soulful eyes and wagging tails lies a world of intelligence and cognitive prowess in our canine companions. Dogs have captivated humans for centuries with their remarkable ability to learn, problem-solve, and communicate. Join us on a journey to explore the wonders of canine intelligence and the fascinating behaviors that showcase their cleverness.</p>
    <p><strong>Adaptive Learning:</strong> Dogs are incredibly adaptive learners, capable of understanding and responding to a wide range of commands and cues. From basic obedience training to complex tasks in agility competitions, their ability to learn and adapt to different situations is a testament to their intelligence.</p>
    <p><em>“The better I get to know men, the more I find myself loving dogs.”</em> - Charles de Gaulle</p>
    <p><strong>Problem-Solving Skills:</strong> Dogs exhibit impressive problem-solving skills, especially when presented with challenges that involve finding food or accessing a desired object. They can use their senses, such as smell and sight, to navigate and overcome obstacles, showcasing their innate intelligence.</p>
    <p><u>Studies</u> have shown that certain breeds, such as Border Collies and Poodles, excel in problem-solving tasks due to their high levels of intelligence and trainability.</p>
    <p><strong>Social Intelligence:</strong> Dogs possess a unique form of social intelligence, allowing them to understand human emotions, intentions, and gestures. They can interpret facial expressions, tone of voice, and body language, making them adept at forming strong bonds with their human companions.</p>
    <p><em>“Dogs do speak, but only to those who know how to listen.”</em> - Orhan Pamuk</p>
    <p><strong>Communication Skills:</strong> While dogs may not speak our language, they communicate effectively through barks, whines, body posture, and facial expressions. They can convey their needs, emotions, and desires, demonstrating a sophisticated level of communication that strengthens the human-dog bond.</p>
    <p><strong>Working Dogs:</strong> Many dogs serve in roles that showcase their intelligence and skills, such as search and rescue dogs, service dogs for individuals with disabilities, and detection dogs trained to sniff out drugs or explosives. Their ability to perform complex tasks with precision and reliability is a testament to their intelligence and training.</p>
    <p><em>“The world would be a nicer place if everyone had the ability to love as unconditionally as a dog.”</em> - M.K. Clinton</p>
    <p><strong>Conclusion:</strong> Dogs continue to amaze us with their intelligence, adaptability, and unique abilities. Whether it's solving puzzles, understanding human emotions, or performing tasks that save lives, dogs prove time and again that they are more than just pets—they are intelligent companions that enrich our lives in countless ways.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[4], userUuids[1], userUuids[3], userUuids[0]],
    userId: userUuids[0],
    tag: "dogs",
  },
  {
    _id: blogUuids[3],
    image: "https://blognotf.s3.amazonaws.com/images/tech1.jpg",
    title: "New Development In Technology",
    content: `<p>Technology has become an integral part of our daily lives, transforming the way we communicate, work, and navigate the world. From groundbreaking innovations to the ever-expanding digital landscape, the evolution of technology continues to shape our future in profound ways. Let's delve into the dynamic world of technology and explore the innovations that are revolutionizing our world.</p>
    <p><strong>Digital Connectivity:</strong> The rise of digital connectivity has ushered in an era of instant communication and global interconnectedness. With the advent of smartphones, social media platforms, and high-speed internet, people can connect, collaborate, and share information across borders like never before.</p>
    <p><em>“Technology is anything that wasn't around when you were born.”</em> - Alan Kay</p>
    <p><strong>Artificial Intelligence:</strong> Artificial intelligence (AI) is at the forefront of technological advancement, with applications ranging from virtual assistants like Siri and Alexa to complex machine learning algorithms used in healthcare, finance, and autonomous vehicles. AI's ability to analyze data, make predictions, and learn from patterns is reshaping industries and driving innovation.</p>
    <p><u>Ethical considerations</u> surrounding AI, such as privacy concerns and algorithm biases, are also critical topics that require ongoing attention and discussion.</p>
    <p><strong>Augmented Reality and Virtual Reality:</strong> Augmented reality (AR) and virtual reality (VR) technologies are transforming how we experience and interact with digital content. From immersive gaming experiences to virtual training simulations in industries like healthcare and education, AR and VR are blurring the lines between the physical and digital worlds.</p>
    <p><em>“We are stuck with technology when what we really want is just stuff that works.”</em> - Douglas Adams</p>
    <p><strong>Sustainable Innovations:</strong> The push for sustainable technologies is driving innovation towards eco-friendly solutions. From renewable energy sources like solar and wind power to advancements in electric vehicles and sustainable agriculture practices, technology plays a crucial role in addressing global environmental challenges.</p>
    <p><strong>Blockchain and Cryptocurrency:</strong> Blockchain technology, best known for its role in cryptocurrencies like Bitcoin and Ethereum, has broader applications in secure data storage, supply chain management, and decentralized finance (DeFi). The transparency, security, and immutability offered by blockchain are reshaping traditional systems and fostering new digital economies.</p>
    <p><em>“Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important.”</em> - Bill Gates</p>
    <p><strong>Future Trends:</strong> Looking ahead, emerging technologies such as quantum computing, 5G networks, biotechnology, and space exploration hold promise for shaping our future. These advancements will unlock new possibilities, drive economic growth, and address complex societal challenges.</p>
    <p><s>In conclusion,</s> The evolution of technology is a continuous journey of innovation, disruption, and adaptation. As we embrace the opportunities and challenges presented by technology, <em>collaboration, ethics,</em> and <u>responsible stewardship</u> are key pillars in shaping a future where technology enriches lives and enhances human potential.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[2], userUuids[0], userUuids[5]],
    userId: userUuids[1],
    tag: "tech",
  },
  {
    _id: blogUuids[4],
    image: "https://blognotf.s3.amazonaws.com/images/tech2.jpg",
    title:
      "The Human Touch in a Digital World: Navigating Technology with Purpose",
    content: `<p>As we immerse ourselves in a world driven by technology, it's crucial to remember the importance of maintaining a human touch amidst the digital landscape. While technology brings convenience, efficiency, and innovation, it's our human values, empathy, and purpose that guide us towards meaningful interactions and impactful outcomes. Let's explore how we can navigate technology with purpose and uphold the human touch in our digital endeavors.</p>
      <p><strong>Empowering Human Connections:</strong> Technology should serve as a tool to enhance human connections rather than replace them. Platforms that facilitate meaningful interactions, foster community engagement, and promote empathy contribute to a more connected and compassionate society.</p>
      <p><em>“Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important.”</em> - Bill Gates</p>
      <p><strong>Cultivating Digital Wellness:</strong> Amidst the digital noise, prioritizing digital wellness is essential. Balancing screen time, practicing mindfulness, and fostering healthy tech habits contribute to overall well-being and mental health in a digital age.</p>
      <p><u>Studies</u> have shown that mindful use of technology, coupled with offline activities and human interactions, leads to a more fulfilling and balanced life.</p>
      <p><strong>Human-Centric Design:</strong> Designing technology with a human-centric approach puts user experience and accessibility at the forefront. Intuitive interfaces, inclusive design practices, and user feedback loops ensure that technology serves diverse needs and empowers individuals of all abilities.</p>
      <p><em>“The most important thing is to try and inspire people so that they can be great in whatever they want to do.”</em> - Kobe Bryant</p>
      <p><strong>Ethical Tech Practices:</strong> Upholding ethical standards in technology development and usage is paramount. Transparent data practices, responsible AI algorithms, and ethical decision-making frameworks foster trust, accountability, and social responsibility in the digital ecosystem.</p>
      <p><strong>Embracing Digital Creativity:</strong> Technology fuels creativity and innovation when coupled with human imagination and ingenuity. From digital art and storytelling to innovative solutions for societal challenges, embracing digital creativity unleashes limitless possibilities for positive impact.</p>
      <p><em>“Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.”</em> - Albert Einstein</p>
      <p><strong>Conclusion:</strong> In navigating the digital world, let's remember that technology is a tool that amplifies our human capabilities and aspirations. By fostering human connections, prioritizing digital wellness, embracing human-centric design, upholding ethical practices, and unleashing digital creativity, we can harness the power of technology with purpose and ensure that the human touch remains at the heart of our digital journey.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[2],
      userUuids[4],
      userUuids[0],
      userUuids[3],
      userUuids[1],
      userUuids[5],
    ],
    userId: userUuids[1],
    tag: "tech",
  },
  {
    _id: blogUuids[5],
    image: "https://blognotf.s3.amazonaws.com/images/tech3.jpg",
    title: "The Rise of Augmented Reality: Revolutionizing Digital Experiences",
    content: `<p>Augmented Reality (AR) is swiftly emerging as a transformative technology, reshaping how we interact with digital content and enhancing our real-world experiences. As AR applications become increasingly accessible and sophisticated, they are revolutionizing various industries and paving the way for a new era of immersive and interactive digital engagement. Let's delve into the rise of augmented reality and explore its myriad applications and potential impact.</p>
      <p><strong>Immersive Entertainment:</strong> AR is redefining the entertainment landscape by offering immersive experiences that blend the digital and physical worlds. From interactive storytelling and gaming experiences to virtual concerts and art installations, AR technologies transport users into captivating and dynamic digital realms.</p>
      <p><em>“The real magic of AR is not in the technology itself, but in how it can make our imagination come alive in the real world.”</em> - Unknown</p>
      <p><strong>Enhanced Learning and Training:</strong> In education and training, AR is revolutionizing how we acquire knowledge and develop skills. Interactive AR simulations, virtual laboratories, and augmented textbooks provide learners with hands-on experiences, fostering engagement, retention, and deeper understanding of complex concepts.</p>
      <p><u>Studies</u> have shown that AR-enhanced learning environments lead to improved learning outcomes and increased motivation among students.</p>
      <p><strong>Retail and Marketing Experiences:</strong> AR is transforming the retail and marketing landscape by offering personalized and interactive shopping experiences. Virtual try-on tools for clothing and cosmetics, AR product visualization in e-commerce, and interactive advertising campaigns engage consumers in innovative ways, driving sales and brand loyalty.</p>
      <p><em>“AR is not just a technology; it's a gateway to a more personalized and engaging consumer experience.”</em> - Marketing Expert</p>
      <p><strong>Healthcare and Medical Applications:</strong> In healthcare, AR is revolutionizing patient care, medical training, and surgical procedures. From AR-assisted surgery and medical imaging visualization to patient education and rehabilitation tools, AR technologies improve accuracy, efficiency, and patient outcomes in the medical field.</p>
      <p><strong>Urban Planning and Architecture:</strong> AR is also making waves in urban planning, architecture, and design. AR-enabled visualization tools allow architects, city planners, and designers to preview and assess projects in real-world environments, facilitating collaborative decision-making, enhancing design accuracy, and optimizing spatial planning.</p>
      <p><em>“AR is reshaping how we envision and create the cities of tomorrow, blending creativity with data-driven insights.”</em> - Urban Planner</p>
      <p><strong>Conclusion:</strong> The rise of augmented reality heralds a new era of innovation, creativity, and immersive experiences across industries. As AR technologies continue to evolve and become more accessible, their potential to transform education, entertainment, healthcare, retail, and urban planning is limitless. Embracing AR opens doors to a world where digital and physical realities converge, unlocking exciting possibilities for enhanced human experiences.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[1], userUuids[3], userUuids[5], userUuids[0]],
    userId: userUuids[1],
    tag: "tech",
  },
  {
    _id: blogUuids[6],
    image: "https://blognotf.s3.amazonaws.com/images/soccer.jpeg",
    title: "The Beautiful Game: Exploring the Magic of Soccer",
    content: `<p>Soccer, known as the beautiful game, captures the hearts of millions around the world with its blend of skill, passion, and teamwork. From the roar of the crowd to the artistry of the players, soccer transcends borders, cultures, and languages, uniting fans in a shared love for the sport. Let's delve into the magic of soccer and celebrate the aspects that make it a global phenomenon.</p>
      <p><strong>The Global Language of Soccer:</strong> Soccer is a universal language that bridges cultural divides and unites people from diverse backgrounds. Whether played on dusty streets, pristine pitches, or grand stadiums, the love for soccer transcends boundaries, creating a sense of belonging and camaraderie among fans worldwide.</p>
      <p><em>“Soccer is a magical game.”</em> - David Beckham</p>
      <p><strong>Artistry and Skill:</strong> Soccer is a showcase of artistry, skill, and athleticism. From mesmerizing dribbles and precise passes to thunderous strikes and acrobatic saves, the beauty of soccer lies in the talent and creativity of its players. Every match is a canvas where players paint their masterpieces with finesse and flair.</p>
      <p><u>Legendary players</u> like Lionel Messi, Cristiano Ronaldo, Pelé, and Diego Maradona have left indelible marks on the sport, inspiring generations with their brilliance on the pitch.</p>
      <p><strong>Thrilling Moments and Drama:</strong> Soccer is synonymous with thrilling moments and dramatic twists. Last-minute goals, penalty shootouts, and epic comebacks keep fans on the edge of their seats, turning matches into unforgettable spectacles filled with tension, excitement, and emotion.</p>
      <p><em>“In football, everything is possible, from the impossible to the improbable.”</em> - Jurgen Klopp</p>
      <p><strong>Unity and Sportsmanship:</strong> Soccer promotes values of unity, teamwork, and sportsmanship. Players come together as a cohesive unit, relying on trust, communication, and collective effort to achieve victory. Respect for opponents, referees, and the spirit of fair play are integral to the ethos of the game.</p>
      <p><strong>Community and Passion:</strong> Soccer is more than just a sport; it's a way of life for many. Communities rally around their teams, creating vibrant atmospheres filled with chants, cheers, and unwavering support. The passion of soccer fans transcends stadiums, turning matches into celebrations of shared identity and pride.</p>
      <p><em>“Football is not just a game, it's a way of life.”</em> - Unknown</p>
      <p><strong>Inspiring Dreams and Aspirations:</strong> For aspiring young players, soccer represents dreams of glory and aspirations of greatness. The journey from local fields to professional arenas is a testament to dedication, perseverance, and the pursuit of excellence. Soccer inspires countless individuals to chase their goals with determination and passion.</p>
      <p><strong>Conclusion:</strong> Soccer is more than a sport; it's a cultural phenomenon that ignites passion, fosters unity, and celebrates the human spirit. As we marvel at the artistry, thrill at the excitement, and cherish the moments of soccer, let's continue to embrace the magic of the beautiful game that unites us all.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[4],
      userUuids[2],
      userUuids[1],
      userUuids[0],
      userUuids[3],
    ],
    userId: userUuids[2],
    tag: "games",
  },
  {
    _id: blogUuids[7],
    image: "https://blognotf.s3.amazonaws.com/images/hot1.jpg",
    title: "Climate Crisis: Urgency Amidst Warming Globe",
    content: `<p>The planet faces a grave threat as global temperatures rise, signaling the urgent need for action to combat climate change. With each passing year, the impacts of global warming become more evident, highlighting the critical importance of addressing this pressing issue. Let's delve into the challenges posed by the climate crisis and explore potential solutions to safeguard our planet's future.</p>
      <p><strong>Environmental Impacts:</strong> The effects of global warming are far-reaching, leading to more frequent and severe heatwaves, droughts, wildfires, and extreme weather events. Melting ice caps, rising sea levels, and disruptions to ecosystems further underscore the environmental consequences of unchecked climate change.</p>
      <p><em>“The Earth does not belong to us; we belong to the Earth.”</em> - Chief Seattle</p>
      <p><strong>Carbon Emissions:</strong> The burning of fossil fuels, deforestation, and industrial activities contribute to the buildup of greenhouse gases in the atmosphere, trapping heat and intensifying the greenhouse effect. Reducing carbon emissions and transitioning to renewable energy sources are crucial steps in mitigating climate change.</p>
      <p><u>United efforts</u> towards carbon neutrality and sustainable practices are essential to limit global temperature rise and minimize environmental degradation.</p>
      <p><strong>Impact on Biodiversity:</strong> Climate change poses a significant threat to biodiversity, leading to habitat loss, species extinction, and disruptions in ecosystems. Coral bleaching, migration patterns of wildlife, and shifts in plant phenology are among the observable impacts on Earth's diverse life forms.</p>
      <p><em>“In nature, nothing exists alone.”</em> - Rachel Carson</p>
      <p><strong>Resilience and Adaptation:</strong> Building resilience to climate change and fostering adaptation strategies are critical in facing the challenges ahead. Implementing sustainable land management practices, investing in climate-resilient infrastructure, and enhancing community preparedness are key components of adaptation efforts.</p>
      <p><strong>Global Cooperation:</strong> Addressing the climate crisis requires global cooperation and collective action. International agreements such as the Paris Agreement aim to unite nations in the fight against climate change, setting targets for emissions reduction, adaptation measures, and financial support for vulnerable communities.</p>
      <p><em>“Climate change is a global problem that requires a global solution.”</em> - Ban Ki-moon</p>
      <p><strong>Sustainable Practices:</strong> Embracing sustainable lifestyles, promoting circular economies, and prioritizing conservation efforts are integral to fostering a more sustainable future. From reducing waste and promoting renewable energy to protecting natural habitats and promoting biodiversity, individual and collective actions play a crucial role in addressing the climate crisis.</p>
      <p><strong>Conclusion:</strong> The urgency of the climate crisis demands immediate and concerted action at local, national, and global levels. By prioritizing sustainability, innovation, and environmental stewardship, we can work towards a resilient and thriving planet for current and future generations.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[3], userUuids[1]],
    userId: userUuids[2],
    tag: "hot",
  },
  {
    _id: blogUuids[8],
    image: "https://blognotf.s3.amazonaws.com/images/chess1.jpg",
    title: "The Brilliance of Chess: Exploring Mikhail Tal's Legacy",
    content: `<p>Chess, often referred to as the game of kings, is a timeless pursuit of strategy, intellect, and creativity. Among the legendary figures who have left an indelible mark on the world of chess, Mikhail Tal stands out as a brilliant and enigmatic player whose style revolutionized the game. Let's delve into the allure of chess and explore the legacy of Mikhail Tal, known for his daring tactics and imaginative play.</p>
      <p><strong>The Game of Strategy:</strong> Chess is a game of intricate strategy, where players navigate the complexities of the board, anticipating their opponent's moves, and formulating plans to achieve victory. Each move requires foresight, calculation, and adaptability, making chess a test of mental acuity and strategic prowess.</p>
      <p><em>“Chess is life in miniature. Chess is struggle, chess is battles.”</em> - Garry Kasparov</p>
      <p><strong>Mikhail Tal's Style:</strong> Mikhail Tal, often hailed as the "Magician from Riga," was renowned for his dynamic and aggressive playing style. He was a master of tactical sacrifices, unexpected maneuvers, and bold attacks that kept his opponents on edge and dazzled spectators with the beauty of his combinations.</p>
      <p><u>His games</u> were characterized by creativity, imagination, and a willingness to take risks, earning him admiration and respect among chess enthusiasts worldwide.</p>
      <p><strong>Chess as Art and Science:</strong> Chess transcends mere gameplay and embodies elements of both art and science. The strategic depth of chess positions it as a scientific endeavor, requiring analytical thinking and logical reasoning. At the same time, the beauty of well-crafted combinations and elegant solutions elevates chess to an art form, showcasing the creativity and genius of players like Mikhail Tal.</p>
      <p><em>“Chess is the art of analysis.”</em> - Mikhail Tal</p>
      <p><strong>Legacy and Influence:</strong> Mikhail Tal's legacy extends beyond his achievements on the chessboard. His bold and imaginative approach to the game inspired generations of players to embrace creativity, take calculated risks, and push the boundaries of conventional play. Tal's influence continues to resonate in modern chess, where his games remain timeless classics and a source of inspiration for aspiring players.</p>
      <p><strong>Chess as a Mental Exercise:</strong> Beyond its competitive aspect, chess serves as a valuable mental exercise that enhances cognitive skills, strategic thinking, decision-making abilities, and concentration. Regular practice and engagement in chess not only improve one's gameplay but also contribute to overall mental acuity and problem-solving abilities.</p>
      <p><em>“Chess is the gymnasium of the mind.”</em> - Blaise Pascal</p>
      <p><strong>Conclusion:</strong> Chess, with its blend of strategy, creativity, and intellectual challenge, continues to captivate players and enthusiasts worldwide. The legacy of players like Mikhail Tal reminds us of the beauty and depth of the game, encouraging us to embrace the artistry and brilliance that chess embodies.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[5],
      userUuids[1],
      userUuids[2],
      userUuids[4],
      userUuids[0],
      userUuids[3],
      userUuids[6],
    ],
    userId: userUuids[2],
    tag: "chess",
  },
  {
    _id: blogUuids[9],
    image: "https://blognotf.s3.amazonaws.com/images/jimihendrix.jpeg",
    title: "The Musical Revolution of Jimi Hendrix: A Legend in Sound",
    content: `<p>Music has the power to transcend boundaries, evoke emotions, and ignite revolutions. Among the iconic figures who reshaped the landscape of music, Jimi Hendrix stands as a legendary guitarist whose innovative style and electrifying performances revolutionized rock and roll. Let's delve into the musical journey of Jimi Hendrix and explore the enduring impact of his groundbreaking artistry.</p>
      <p><strong>The Guitar Virtuoso:</strong> Jimi Hendrix's mastery of the electric guitar remains unparalleled, earning him a place among the greatest guitarists in history. His innovative use of feedback, distortion, and wah-wah effects created a sonic palette that pushed the boundaries of what was possible with the instrument.</p>
      <p><em>“I'm the one that has to die when it's time for me to die, so let me live my life the way I want to.”</em> - Jimi Hendrix</p>
      <p><strong>Revolutionizing Rock:</strong> Hendrix's impact on rock music was revolutionary, blending elements of blues, jazz, funk, and psychedelia into a unique and groundbreaking sound. His iconic performances at Woodstock and Monterey Pop Festival solidified his status as a cultural icon and a symbol of musical innovation.</p>
      <p><u>Hendrix's albums</u> such as "Are You Experienced," "Axis: Bold as Love," and "Electric Ladyland" continue to inspire musicians and listeners across generations.</p>
      <p><strong>Experimental Spirit:</strong> Jimi Hendrix was known for his fearless experimentation and improvisation, pushing the boundaries of traditional song structures and musical conventions. His freewheeling approach to music creation and live performances captivated audiences and left a lasting impact on the evolution of rock and roll.</p>
      <p><em>“When the power of love overcomes the love of power, the world will know peace.”</em> - Jimi Hendrix</p>
      <p><strong>Cultural Influence:</strong> Beyond his musical contributions, Jimi Hendrix's influence extended to social and cultural realms. He challenged racial barriers in the music industry, inspired a generation of musicians to explore new sonic frontiers, and became a symbol of counterculture and artistic freedom during the turbulent 1960s.</p>
      <p><strong>Lingering Legacy:</strong> Jimi Hendrix's legacy endures through his timeless music, innovative guitar techniques, and enduring influence on rock, blues, and psychedelic genres. His iconic rendition of "The Star-Spangled Banner" and his electrifying live performances continue to captivate audiences and cement his place as a true legend of music.</p>
      <p><em>“Music is my religion.”</em> - Jimi Hendrix</p>
      <p><strong>Conclusion:</strong> Jimi Hendrix's musical genius and pioneering spirit continue to inspire musicians and music lovers worldwide. His fearless experimentation, electrifying performances, and enduring impact on rock and roll make him an immortal figure in the annals of music history, leaving behind a legacy of innovation, creativity, and sonic revolution.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[5],
      userUuids[0],
      userUuids[2],
      userUuids[4],
      userUuids[1],
      userUuids[3],
    ],
    userId: userUuids[3],
    tag: "music",
  },
  {
    _id: blogUuids[10],
    image: "https://blognotf.s3.amazonaws.com/images/music1.jpg",
    title:
      "Exploring the Modern Jazz Renaissance: A Fusion of Tradition and Innovation",
    content: `<p>Modern jazz, a dynamic and evolving genre, embodies the spirit of musical exploration, innovation, and collaboration. From its roots in traditional jazz styles to its embrace of diverse influences and experimental sounds, modern jazz continues to push the boundaries of creativity and expression. Let's delve into the vibrant world of modern jazz and explore its eclectic blend of tradition and innovation.</p>
      <p><strong>Evolution of Jazz:</strong> Jazz has undergone a remarkable evolution over the decades, embracing new styles, influences, and techniques while retaining its core elements of improvisation, syncopation, and rhythmic complexity. Modern jazz builds upon this rich legacy, incorporating elements of funk, fusion, Latin rhythms, and global musical traditions into its sonic tapestry.</p>
      <p><em>“Jazz is not just music, it's a way of life, it's a way of being, a way of thinking.”</em> - Nina Simone</p>
      <p><strong>Exploration of Sounds:</strong> Modern jazz artists are fearless in their exploration of sounds, textures, and sonic landscapes. From avant-garde compositions and experimental harmonies to electronic elements and genre-blurring collaborations, modern jazz pushes the boundaries of what defines jazz music, inviting listeners on a journey of sonic discovery.</p>
      <p><u>Albums</u> like Kamasi Washington's "The Epic," Snarky Puppy's "We Like It Here," and Esperanza Spalding's "Emily's D+Evolution" showcase the diverse and innovative approaches within modern jazz.</p>
      <p><strong>Global Influences:</strong> Modern jazz embraces global influences, reflecting a multicultural and interconnected world. Artists draw inspiration from traditional music styles from around the globe, infusing jazz with elements of Afrobeat, Indian classical music, Brazilian rhythms, and Middle Eastern melodies, creating a rich and eclectic fusion of sounds.</p>
      <p><em>“The beauty of jazz is that it's a conversation, a dialogue that's always evolving.”</em> - Herbie Hancock</p>
      <p><strong>Technological Integration:</strong> Advances in technology have also shaped modern jazz, allowing artists to explore new sonic possibilities and production techniques. Electronic instruments, sampling, looping, and digital effects are seamlessly integrated into jazz compositions, adding layers of complexity and innovation to the music.</p>
      <p><strong>Collaborative Spirit:</strong> Collaboration is at the heart of modern jazz, with artists from diverse backgrounds coming together to create unique and groundbreaking music. Cross-genre collaborations, interdisciplinary projects, and collective improvisations showcase the collaborative spirit and collective creativity within the modern jazz community.</p>
      <p><em>“Jazz is about being in the moment, taking risks, and connecting with other musicians and audiences on a deep level.”</em> - Wayne Shorter</p>
      <p><strong>Continued Relevance:</strong> Despite its evolution, modern jazz remains relevant and vibrant in today's music scene. Its ability to adapt, innovate, and transcend musical boundaries ensures its continued appeal to listeners of all ages and backgrounds, reaffirming jazz as a living, breathing art form that continues to inspire and captivate.</p>
      <p><strong>Conclusion:</strong> The modern jazz renaissance represents a fusion of tradition and innovation, where artists fearlessly explore new horizons while honoring the rich heritage of jazz music. As modern jazz continues to evolve and captivate audiences worldwide, its boundless creativity and expressive power ensure its enduring legacy in the realm of musical exploration.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[4], userUuids[0], userUuids[2]],
    userId: userUuids[3],
    tag: "music",
  },
  {
    _id: blogUuids[11],
    image: "https://blognotf.s3.amazonaws.com/images/jordan.jpeg",
    title:
      "The Legacy of Michael Jordan: A Basketball Icon's Journey to Greatness",
    content: `<p>Basketball, a game of skill, athleticism, and teamwork, has produced iconic figures who have left an indelible mark on the sport. Among them stands Michael Jordan, a basketball legend whose journey to greatness embodies determination, excellence, and unparalleled talent. Let's explore the enduring legacy of Michael Jordan and his impact on the world of basketball.</p>
      <p><strong>The Rise of a Legend:</strong> Michael Jordan's basketball journey began with a passion for the game and a relentless drive to succeed. From his college days at the University of North Carolina to his illustrious NBA career with the Chicago Bulls, Jordan's ascent to basketball stardom was marked by dedication, hard work, and a competitive spirit that set him apart.</p>
      <p><em>“I've failed over and over and over again in my life, and that is why I succeed.”</em> - Michael Jordan</p>
      <p><strong>Unmatched Skills and Versatility:</strong> Jordan's on-court prowess was unmatched, showcasing a rare combination of scoring ability, defensive prowess, and clutch performances. His trademark moves, including the iconic mid-air acrobatics and fadeaway jumpers, made him a scoring machine and a nightmare for opposing defenses.</p>
      <p><u>His Airness</u> revolutionized the game with his versatility, athleticism, and basketball IQ, earning him accolades as one of the greatest players in NBA history.</p>
      <p><strong>Championship Legacy:</strong> Michael Jordan's impact on the NBA is synonymous with championship success. His leadership and competitive fire propelled the Chicago Bulls to six NBA championships, cementing his legacy as a clutch performer and a winner on the grandest stage of basketball.</p>
      <p><em>“I can accept failure, everyone fails at something. But I can't accept not trying.”</em> - Michael Jordan</p>
      <p><strong>Cultural Icon and Global Influence:</strong> Beyond his basketball achievements, Michael Jordan transcended sports to become a cultural icon and global influencer. His Air Jordan sneaker line with Nike revolutionized sports marketing and sneaker culture, while his charisma and impact extended to movies, endorsements, and philanthropy.</p>
      <p><strong>Legacy of Excellence:</strong> Michael Jordan's legacy endures not only in his statistical achievements and championship victories but also in the mindset of excellence, resilience, and determination he embodied. His work ethic, competitiveness, and relentless pursuit of greatness serve as inspirations for athletes and individuals across generations.</p>
      <p><em>“I've always believed that if you put in the work, the results will come.”</em> - Michael Jordan</p>
      <p><strong>Impact on Basketball Culture:</strong> Jordan's influence extends to basketball culture, shaping the way the game is played, perceived, and celebrated. His impact on future generations of players, from Kobe Bryant and LeBron James to aspiring young athletes worldwide, is a testament to his enduring influence and lasting legacy.</p>
      <p><strong>Conclusion:</strong> Michael Jordan's journey from aspiring player to basketball icon embodies the essence of greatness, perseverance, and excellence. His impact on the sport, culture, and global community transcends basketball, leaving a legacy of inspiration, determination, and the relentless pursuit of greatness.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[5],
      userUuids[0],
      userUuids[2],
      userUuids[4],
      userUuids[1],
      userUuids[3],
    ],
    userId: userUuids[3],
    tag: "games",
  },
  {
    _id: blogUuids[12],
    image: "https://blognotf.s3.amazonaws.com/images/ronaldo.jpeg",
    title: "Cristiano Ronaldo: The Maestro of Football Excellence",
    content: `<p>Cristiano Ronaldo, often hailed as one of the greatest footballers of all time, has captivated fans worldwide with his exceptional talent, dedication, and relentless pursuit of excellence on the football pitch. From his early days as a prodigious talent to his illustrious career at the pinnacle of world football, Ronaldo's journey embodies the essence of footballing greatness. Let's delve into the remarkable legacy of Cristiano Ronaldo and his impact on the beautiful game.</p>
      <p><strong>Rising Star:</strong> Cristiano Ronaldo's journey to football stardom began in Madeira, Portugal, where his raw talent and dedication caught the attention of scouts at a young age. His journey from Sporting Lisbon to Manchester United marked the rise of a footballing prodigy destined for greatness.</p>
      <p><em>“Talent without working hard is nothing.”</em> - Cristiano Ronaldo</p>
      <p><strong>Technique and Skill:</strong> Ronaldo's footballing prowess is characterized by his exceptional technique, dribbling ability, and clinical finishing. His trademark free kicks, powerful strikes, and aerial prowess make him a constant threat on the field, showcasing a level of skill and precision that few can match.</p>
      <p><u>His goal-scoring</u> record and individual accolades speak volumes about his talent and impact on the game.</p>
      <p><strong>Leadership and Determination:</strong> Ronaldo's leadership qualities and determination are evident in his on-field performances and work ethic. Whether leading his teams to domestic and international titles or inspiring comebacks with his sheer will to win, Ronaldo's competitive spirit and dedication set him apart as a true footballing leader.</p>
      <p><em>“Your love makes me strong, your hate makes me unstoppable.”</em> - Cristiano Ronaldo</p>
      <p><strong>Global Icon:</strong> Ronaldo's influence extends beyond the football pitch, making him a global icon and brand ambassador. His marketability, charisma, and philanthropic efforts have made him a role model for aspiring athletes and a symbol of excellence in sports.</p>
      <p><strong>International Success:</strong> Ronaldo's impact on the international stage is equally impressive, with his performances for the Portuguese national team earning him accolades and recognition as one of the greatest players in football history. His leadership during Portugal's triumphs in Euro 2016 and the UEFA Nations League showcases his ability to shine on the grandest stages.</p>
      <p><strong>Legacy of Greatness:</strong> Cristiano Ronaldo's legacy in football is marked by records broken, trophies lifted, and moments of brilliance etched in footballing history. His impact on the game transcends statistics, as he continues to inspire a new generation of players and fans with his passion, dedication, and pursuit of footballing excellence.</p>
      <p><em>“I'm not a perfectionist, but I like to feel that things are done well. More important than that, I feel an endless need to learn, to improve, to evolve, not only to please the coach and the fans but also to feel satisfied with myself.”</em> - Cristiano Ronaldo</p>
      <p><strong>Conclusion:</strong> Cristiano Ronaldo's journey from a young talent in Madeira to a global footballing icon is a testament to his talent, dedication, and relentless pursuit of greatness. His impact on the sport and his legacy as one of football's all-time greats will be remembered and celebrated for generations to come.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[1], userUuids[3]],
    userId: userUuids[4],
    tag: "games",
  },
  {
    _id: blogUuids[13],
    image: "https://blognotf.s3.amazonaws.com/images/tupac.jpeg",
    title:
      "The Immortal Legacy of Tupac Shakur: A Voice of Revolution in Rap Music",
    content: `<p>Rap music, with its powerful lyrics and rhythmic beats, has been a platform for artists to express their thoughts, struggles, and aspirations. Among the influential figures in the world of rap, Tupac Shakur, often referred to as 2Pac, stands as a towering figure whose music resonates with authenticity, social consciousness, and raw emotion. Let's explore the enduring legacy of Tupac Shakur and his impact on the genre of rap music.</p>
      <p><strong>A Voice of the Streets:</strong> Tupac Shakur's journey in rap music began in the streets of Harlem and Oakland, where he experienced firsthand the realities of poverty, violence, and systemic injustice. His lyrics reflected the struggles and resilience of inner-city life, making him a voice for the marginalized and oppressed.</p>
      <p><em>“Reality is wrong. Dreams are for real.”</em> - Tupac Shakur</p>
      <p><strong>Lyricism and Storytelling:</strong> Tupac's lyricism was characterized by poignant storytelling, introspection, and social commentary. His ability to paint vivid pictures with words, addressing themes of racism, police brutality, poverty, and political corruption, resonated with audiences worldwide and elevated rap music to a platform for social change.</p>
      <p><u>Albums like</u> "Me Against the World," "All Eyez on Me," and "The Don Killuminati: The 7 Day Theory" showcase Tupac's lyrical prowess and narrative depth.</p>
      <p><strong>Social Consciousness:</strong> Tupac Shakur's music was not just entertainment; it was a call to action and a reflection of societal issues. He addressed topics such as racial inequality, police brutality, urban struggles, and the plight of the disenfranchised, sparking conversations and raising awareness through his art.</p>
      <p><em>“I'm not saying I'm gonna change the world, but I guarantee that I will spark the brain that will change the world.”</em> - Tupac Shakur</p>
      <p><strong>Cultural Impact:</strong> Tupac's impact extended beyond music into film, literature, and activism. His charismatic presence on screen, with roles in films like "Juice" and "Poetic Justice," showcased his versatility as an artist. Additionally, his poetry and philosophical musings revealed a deeper introspection and intellectual depth.</p>
      <p><strong>Legacy of Influence:</strong> Tupac Shakur's legacy as a rap icon and cultural influencer endures decades after his untimely passing. His influence can be seen in the work of contemporary artists who continue to address social issues, advocate for change, and use their platforms for positive impact.</p>
      <p><em>“I'm a reflection of the community.”</em> - Tupac Shakur</p>
      <p><strong>Immortalized in Memory:</strong> Tupac's impact on rap music goes beyond his chart-topping hits; it resides in the hearts and minds of fans who continue to celebrate his music, message, and enduring spirit. His authenticity, passion, and commitment to truth remain etched in the annals of rap history.</p>
      <p><strong>Conclusion:</strong> Tupac Shakur's legacy in rap music transcends genres; it embodies a voice of revolution, resilience, and truth. His artistry, activism, and cultural impact continue to inspire generations, cementing his status as an immortal icon in the world of music and beyond.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[2], userUuids[4], userUuids[0], userUuids[1]],
    userId: userUuids[4],
    tag: "music",
  },
  {
    _id: blogUuids[14],
    image: "https://blognotf.s3.amazonaws.com/images/code.jpeg",
    title: "Unleashing Creativity and Interactivity: The Power of JavaScript",
    content: `<p>JavaScript, often hailed as the language of the web, is a versatile and dynamic programming language that powers the interactive and engaging experiences we encounter online. From dynamic web pages to interactive applications, JavaScript plays a crucial role in shaping the digital landscape. Let's delve into the world of JavaScript and explore its capabilities, applications, and impact on modern web development.</p>
      <p><strong>Foundation of Web Interactivity:</strong> JavaScript serves as the foundation for adding interactivity and dynamism to web pages. With its ability to manipulate HTML, CSS, and the Document Object Model (DOM), JavaScript enables developers to create responsive and interactive user interfaces that enhance user experience.</p>
      <p><em>“JavaScript is the language of the web, empowering developers to create dynamic and engaging experiences for users.”</em></p>
      <p><strong>Client-Side Scripting:</strong> JavaScript is primarily a client-side scripting language, meaning it runs on the user's browser rather than on the web server. This allows for real-time interactions, form validations, animations, and dynamic content updates without the need to reload the entire web page.</p>
      <p><strong>Frameworks and Libraries:</strong> JavaScript ecosystem is enriched by a multitude of frameworks and libraries that streamline development and enhance functionality. Frameworks like React, Angular, and Vue.js facilitate the creation of complex web applications, while libraries such as jQuery simplify DOM manipulation and event handling.</p>
      <p><em>“JavaScript frameworks and libraries empower developers to build scalable and maintainable web applications with ease.”</em></p>
      <p><strong>Server-Side Capabilities:</strong> While JavaScript is primarily associated with client-side scripting, advancements such as Node.js have expanded its capabilities to server-side development. Node.js allows developers to build scalable and efficient server-side applications using JavaScript, leveraging its event-driven, non-blocking I/O model.</p>
      <p><strong>Interactive Web Applications:</strong> JavaScript powers a wide range of interactive web applications, including online games, social media platforms, e-commerce websites, and productivity tools. Its ability to handle user input, process data asynchronously, and communicate with servers via APIs makes it a versatile choice for modern web development.</p>
      <p><em>“JavaScript enables developers to create dynamic and interactive web applications that engage users and deliver seamless experiences across devices.”</em></p>
      <p><strong>Continuous Evolution:</strong> JavaScript continues to evolve with new language features, standards, and tools that enhance developer productivity and code quality. The ECMAScript standards, regular updates to browsers, and developer tools like Chrome DevTools contribute to the ongoing growth and innovation within the JavaScript ecosystem.</p>
      <p><strong>Conclusion:</strong> JavaScript's versatility, interactivity, and widespread adoption make it an indispensable tool for modern web development. From enhancing user interfaces to building complex web applications, JavaScript empowers developers to unleash creativity, deliver engaging user experiences, and shape the future of the web.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[3], userUuids[1], userUuids[5]],
    userId: userUuids[4],
    tag: "code",
  },
  {
    _id: blogUuids[15],
    image: "https://blognotf.s3.amazonaws.com/images/ocaml.jpeg",
    title:
      "Exploring the Functional Elegance of OCaml: A Journey into Modern Programming Paradigms",
    content: `<p>OCaml, a powerful functional programming language, combines the elegance of functional programming with the efficiency of imperative and object-oriented paradigms. Its expressive syntax, strong type system, and emphasis on immutability make it a versatile tool for building robust and scalable software. Let's embark on a journey into the world of OCaml and explore its unique features, applications, and benefits in modern programming.</p>
      <p><strong>Functional Programming Paradigm:</strong> OCaml is rooted in the functional programming paradigm, where functions are treated as first-class citizens and immutability is emphasized. This approach leads to concise, modular, and maintainable code that is less prone to errors and easier to reason about.</p>
      <p><em>“OCaml's functional paradigm encourages clean, composable, and reusable code, fostering a culture of software correctness and reliability.”</em></p>
      <p><strong>Strong Type System:</strong> OCaml boasts a powerful type system that combines static typing with type inference, allowing developers to catch errors at compile time while providing flexibility in writing expressive code. This ensures code safety, reduces bugs, and facilitates code optimization.</p>
      <p><strong>Pattern Matching and Algebraic Data Types:</strong> One of OCaml's standout features is its robust support for pattern matching and algebraic data types. This enables developers to handle complex data structures and control flow scenarios with elegance and precision, leading to code that is both readable and efficient.</p>
      <p><strong>Concurrency and Multicore Support:</strong> OCaml offers built-in support for concurrency through lightweight threads and asynchronous programming models. With the advent of multicore OCaml, developers can leverage parallelism and multicore architectures to enhance performance and scalability of their applications.</p>
      <p><em>“OCaml's concurrency features and multicore support enable developers to write concurrent, scalable, and responsive software without sacrificing correctness or safety.”</em></p>
      <p><strong>Tooling and Ecosystem:</strong> The OCaml ecosystem is supported by a rich set of tools, libraries, and frameworks that facilitate development across various domains. From web development frameworks like Ocsigen to data processing libraries like Jane Street's Core, OCaml offers a comprehensive toolkit for building diverse applications.</p>
      <p><strong>Applications in Industry and Academia:</strong> OCaml's versatility and reliability have led to its adoption in industry sectors such as finance, healthcare, and telecommunications, where correctness, performance, and scalability are paramount. It also continues to be a popular choice in academic circles for teaching programming language concepts and conducting research in functional programming.</p>
      <p><em>“OCaml's real-world applications span industries and domains, showcasing its adaptability, performance, and reliability in demanding environments.”</em></p>
      <p><strong>Community and Open Source Culture:</strong> The OCaml community is vibrant, collaborative, and dedicated to advancing the language and its ecosystem. Open source contributions, community-driven projects, and active forums foster knowledge sharing, innovation, and continuous improvement within the OCaml community.</p>
      <p><strong>Conclusion:</strong> OCaml's blend of functional elegance, strong typing, concurrency support, and robust tooling makes it a compelling choice for developers seeking a balance between expressive programming and pragmatic solutions. Whether building scalable web applications, developing concurrent systems, or exploring new programming paradigms, OCaml empowers developers to write reliable, efficient, and maintainable software.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[1],
      userUuids[3],
      userUuids[5],
      userUuids[0],
      userUuids[2],
      userUuids[4],
      userUuids[6],
    ],
    userId: userUuids[5],
    tag: "code",
  },
  {
    _id: blogUuids[16],
    image: "https://blognotf.s3.amazonaws.com/images/space1.jpg",
    title: "Mars Exploration Programs: Pioneering the Red Planet",
    content: `<p>The exploration of Mars has captivated the imagination of scientists, space enthusiasts, and the public alike, sparking ambitious programs and missions to unravel the mysteries of the Red Planet. From robotic rovers to future human expeditions, Mars exploration programs represent humanity's quest for knowledge, discovery, and potential colonization of another world. Let's delve into the fascinating realm of Mars exploration programs and the groundbreaking missions that pave the way for humanity's interplanetary journey.</p>
      <p><strong>Robotic Probes and Rovers:</strong> Mars exploration began with robotic probes and rovers sent to study the planet's surface, atmosphere, and geological features. Missions like NASA's Mars rovers Spirit, Opportunity, and Curiosity, along with the European Space Agency's ExoMars rover, have provided invaluable data on Mars' past environments, potential for life, and geophysical characteristics.</p>
      <p><em>“Robotic probes and rovers are our eyes and hands on Mars, unlocking the planet's secrets and preparing the way for future human exploration.”</em></p>
      <p><strong>Search for Life:</strong> Mars exploration programs are driven by the quest to uncover evidence of past or present life on the planet. Scientific instruments aboard rovers and landers analyze Martian soil, rocks, and atmosphere for bio-signatures, organic compounds, and clues to Mars' habitability, offering insights into the potential origins of life beyond Earth.</p>
      <p><strong>Sample Return Missions:</strong> Future Mars missions aim to bring samples of Martian soil and rocks back to Earth for detailed analysis. NASA's Mars Sample Return mission, in collaboration with international partners, plans to collect, store, and return samples from Mars, offering scientists unprecedented opportunities to study Martian geology, chemistry, and potential microbial life.</p>
      <p><em>“Sample return missions hold the promise of unlocking Mars' geological history and answering fundamental questions about the planet's past and present.”</em></p>
      <p><strong>Human Exploration and Colonization:</strong> Mars exploration programs are laying the groundwork for future human missions to the Red Planet. Agencies like NASA, SpaceX, and international partners envision crewed missions to Mars, establishing habitats, conducting scientific research, and eventually paving the way for human colonization of Mars as a multi-planetary species.</p>
      <p><strong>Technological Advancements:</strong> Mars exploration drives innovation in spacecraft technology, robotics, life support systems, propulsion, and space habitats. Advancements in autonomous navigation, resource utilization, and sustainability in space are essential for long-duration missions to Mars and beyond.</p>
      <p><em>“Mars exploration fuels technological innovation, pushing the boundaries of space exploration and opening new frontiers for humanity.”</em></p>
      <p><strong>International Collaboration:</strong> Mars exploration programs benefit from international collaboration and partnerships among space agencies, research institutions, and private companies. Shared resources, expertise, and scientific goals foster a global effort towards unlocking Mars' mysteries and expanding humanity's presence in the solar system.</p>
      <p><strong>Public Engagement and Inspiration:</strong> Mars exploration captures the public's imagination and curiosity, inspiring future generations of scientists, engineers, and explorers. Outreach initiatives, educational programs, and media coverage of Mars missions foster a sense of wonder, discovery, and optimism about humanity's potential in space exploration.</p>
      <p><em>“Mars exploration programs ignite curiosity, inspire innovation, and unite humanity in our shared quest to explore the cosmos and expand our understanding of the universe.”</em></p>
      <p><strong>Conclusion:</strong> Mars exploration programs represent humanity's collective ambition, ingenuity, and resilience in venturing beyond Earth to explore new worlds. Through robotic missions, sample return endeavors, future human expeditions, and international collaboration, Mars exploration heralds a new era of discovery, paving the way for humanity's enduring presence in the cosmos.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[2],
      userUuids[1],
      userUuids[0],
      userUuids[4],
      userUuids[3],
    ],
    userId: userUuids[5],
    tag: "space",
  },
  {
    _id: blogUuids[17],
    image: "https://blognotf.s3.amazonaws.com/images/space2.jpg",
    title: "Black Holes: The Cosmic Enigma of Infinite Gravity",
    content: `<p>Black holes, mysterious cosmic objects with gravitational forces so immense that not even light can escape, have fascinated astronomers, physicists, and enthusiasts for decades. These enigmatic entities, born from the collapse of massive stars, challenge our understanding of space, time, and the fundamental laws of physics. Let's delve into the captivating world of black holes and unravel the mysteries that surround these cosmic enigmas.</p>
      <p><strong>Nature's Extreme Gravitational Force:</strong> Black holes are characterized by their immense gravitational pull, which arises from the concentration of mass within a small volume. The gravitational force near a black hole is so strong that it distorts space-time, creating a region from which nothing, not even light, can escape—the event horizon.</p>
      <p><em>“Black holes are cosmic juggernauts, where gravity's grip is so intense that it defies our conventional understanding of the universe.”</em></p>
      <p><strong>Formation and Lifecycle:</strong> Black holes are formed through the gravitational collapse of massive stars at the end of their life cycle. When a star exhausts its nuclear fuel, it may undergo a supernova explosion, leaving behind a dense core. If this core exceeds a critical mass (the Chandrasekhar limit for stellar black holes), gravitational collapse occurs, forming a black hole.</p>
      <p><strong>Types of Black Holes:</strong> There are different types of black holes based on their mass and formation. Stellar black holes, with masses several times that of the Sun, result from collapsed massive stars. Intermediate black holes are more massive, possibly formed through mergers of stellar black holes or other processes. Supermassive black holes, found at the centers of galaxies, have masses millions to billions of times that of the Sun and play a crucial role in galactic evolution.</p>
      <p><strong>Event Horizon and Singularity:</strong> The event horizon of a black hole is the boundary beyond which escape is impossible. Within the event horizon lies the singularity, a point of infinite density where the laws of physics, including our understanding of space and time, break down. The singularity represents a gravitational singularity, a region where density and curvature become infinite.</p>
      <p><em>“At the heart of a black hole lies a cosmic mystery, where the laws of physics as we know them cease to apply, and the fabric of space-time bends into an unfathomable abyss.”</em></p>
      <p><strong>Black Hole Dynamics:</strong> Black holes exhibit fascinating phenomena such as gravitational lensing, where their immense gravity bends light from distant objects, creating gravitational "lenses" that magnify and distort images. They also emit radiation known as Hawking radiation, theorized by Stephen Hawking, which results from quantum effects near the event horizon.</p>
      <p><strong>Scientific Exploration and Observations:</strong> Observing black holes directly is challenging due to their nature, but advancements in astronomy, space telescopes like Hubble and Chandra, and the Event Horizon Telescope (EHT) have allowed scientists to study black holes indirectly through their effects on surrounding matter and light. The first-ever image of a black hole's event horizon, captured by the EHT in 2019, marked a historic milestone in astrophysical research.</p>
      <p><em>“Through innovative technology and collaborative efforts, scientists are peering into the depths of black holes, unraveling cosmic mysteries and expanding our understanding of the universe.”</em></p>
      <p><strong>Future Frontiers:</strong> Black holes continue to intrigue and inspire scientific inquiry, with ongoing research focused on understanding their properties, evolution, and role in the cosmos. Future space missions, theoretical advancements, and interdisciplinary studies promise to unlock further insights into the nature of black holes and their profound impact on the universe.</p>
      <p><em>“As humanity ventures deeper into the cosmos, the allure of black holes beckons us to explore the ultimate extremes of gravity, space, and time, unveiling the secrets of the universe's darkest mysteries.”</em></p>
      <p><strong>Conclusion:</strong> Black holes stand as cosmic marvels, pushing the boundaries of our scientific knowledge and sparking awe and wonder about the vastness and complexity of the universe. As our exploration and understanding of black holes evolve, they continue to reign as celestial wonders that challenge, inspire, and captivate our imagination.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[4]],
    userId: userUuids[5],
    tag: "space",
  },
  {
    _id: blogUuids[18],
    image: "https://blognotf.s3.amazonaws.com/images/code.jpeg",
    title:
      "Mastering Good Programming Practices: Building Robust and Maintainable Code",
    content: `<p>Good programming practices are the cornerstone of efficient, maintainable, and scalable software development. They encompass a set of principles, guidelines, and habits that empower developers to write high-quality code, collaborate effectively, and produce software that meets user expectations. Let's explore the essential elements of good programming practices and how they contribute to the success of software projects.</p>
      <p><strong>Clean and Readable Code:</strong> Writing clean, readable code is fundamental to good programming practices. Clear and descriptive variable names, well-structured functions, consistent formatting, and meaningful comments enhance code readability, making it easier for developers to understand, debug, and maintain the codebase.</p>
      <p><em>“Clean code is not just about syntax; it's about conveying intent, fostering collaboration, and ensuring code clarity for present and future developers.”</em></p>
      <p><strong>Modular and DRY (Don't Repeat Yourself) Code:</strong> Modular programming involves breaking down complex systems into smaller, reusable modules or functions. Adopting DRY principles encourages code reuse and reduces redundancy, leading to more efficient and maintainable codebases. Modular and DRY code promotes scalability, flexibility, and ease of maintenance.</p>
      <p><strong>Consistent Coding Style:</strong> Consistency in coding style and conventions is essential for team collaboration and codebase maintenance. Adopting a coding style guide, using linting tools, and enforcing coding standards across the development team ensures uniformity, reduces errors, and improves code quality.</p>
      <p><em>“Consistency in coding style is like speaking the same language; it fosters cohesion, minimizes confusion, and enhances codebase readability and maintainability.”</em></p>
      <p><strong>Version Control and Git Best Practices:</strong> Leveraging version control systems like Git and adhering to best practices such as frequent commits, meaningful commit messages, branching strategies, and code reviews streamline collaboration, enable code review processes, and ensure version history management. Version control enhances code traceability, accountability, and facilitates seamless collaboration among team members.</p>
      <p><strong>Test-Driven Development (TDD) and Automated Testing:</strong> Adopting test-driven development practices, writing unit tests, and implementing automated testing frameworks promote code reliability, identify bugs early in the development cycle, and validate code functionality against requirements. Automated testing accelerates the feedback loop, improves code quality, and fosters confidence in code changes.</p>
      <p><em>“Test-driven development shifts the focus from fixing bugs to preventing bugs, fostering a culture of proactive quality assurance and continuous improvement.”</em></p>
      <p><strong>Documentation and Code Comments:</strong> Comprehensive documentation, including inline code comments, README files, API documentation, and user guides, enhances codebase understanding, facilitates onboarding of new developers, and promotes knowledge sharing within the development team. Clear documentation improves code maintainability, fosters collaboration, and supports long-term project sustainability.</p>
      <p><em>“Well-documented code is like a map that guides developers through the codebase, enabling them to navigate, understand, and contribute effectively to the project.”</em></p>
      <p><strong>Code Reviews and Continuous Integration:</strong> Conducting code reviews, leveraging peer feedback, and embracing continuous integration and continuous deployment (CI/CD) practices ensure code quality, identify potential issues early, and promote codebase stability. Code reviews foster knowledge exchange, improve codebase consistency, and validate code changes against project standards and requirements.</p>
      <p><em>“Code reviews are not just about finding bugs; they are about sharing knowledge, improving code quality, and fostering a culture of continuous learning and collaboration.”</em></p>
      <p><strong>Performance Optimization and Scalability:</strong> Considerations for performance optimization, efficient algorithms, data structures, and scalability are integral to good programming practices. Analyzing code performance, identifying bottlenecks, optimizing critical sections, and designing scalable architectures contribute to software reliability, responsiveness, and user satisfaction.</p>
      <p><em>“Performance optimization is a journey of iterative refinement, where continuous evaluation, profiling, and optimization strategies enhance software efficiency and user experience.”</em></p>
      <p><strong>Security Practices:</strong> Incorporating security best practices, such as input validation, data encryption, secure authentication, and vulnerability assessments, enhances software resilience against cyber threats and protects sensitive data. Prioritizing security considerations in the development lifecycle safeguards user privacy, builds trust, and mitigates security risks.</p>
      <p><em>“Security is not an afterthought; it's a fundamental aspect of software development that requires proactive measures, robust defenses, and continuous vigilance.”</em></p>
      <p><strong>Continuous Learning and Professional Development:</strong> Embracing a culture of continuous learning, staying updated with industry trends, technologies, and best practices, and fostering a growth mindset among team members promote excellence, innovation, and adaptability in software development. Investing in professional development empowers developers to acquire new skills, solve complex challenges, and drive continuous improvement in software quality and efficiency.</p>
      <p><em>“In the dynamic landscape of software development, continuous learning fuels creativity, innovation, and mastery, enabling teams to deliver exceptional software solutions.”</em></p>
      <p><strong>Conclusion:</strong> Good programming practices encompass a holistic approach to software development, encompassing coding standards, collaboration, testing, documentation, performance optimization, security, and continuous improvement. By adhering to these principles, developers can build robust, scalable, and maintainable software solutions that meet user needs, foster team collaboration, and drive technological innovation.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[1],
      userUuids[3],
      userUuids[5],
      userUuids[0],
      userUuids[2],
    ],
    userId: userUuids[6],
    tag: "code",
  },
  {
    _id: blogUuids[19],
    image: "https://blognotf.s3.amazonaws.com/images/stevejobs.jpeg",
    title: "The Apple Revolution: Steve Jobs' Legacy of Innovation and Vision",
    content: `<p>Apple Inc., a tech giant renowned for its revolutionary products and iconic design, owes much of its success to the visionary leadership of Steve Jobs. As the co-founder and driving force behind Apple's innovative journey, Jobs left an indelible mark on the world of technology, entrepreneurship, and creative innovation. Let's delve into the transformative legacy of Apple and the enduring influence of Steve Jobs on the tech industry and beyond.</p>
      <p><strong>Visionary Leadership:</strong> Steve Jobs' visionary leadership was characterized by a relentless pursuit of excellence, a focus on user experience, and a passion for innovation. His ability to anticipate consumer needs, envision disruptive technologies, and transform industries set Apple apart as a leader in design and technology.</p>
      <p><em>“Innovation distinguishes between a leader and a follower.”</em> - Steve Jobs</p>
      <p><strong>Revolutionary Products:</strong> Under Steve Jobs' leadership, Apple introduced game-changing products that redefined markets and captivated consumers worldwide. From the iconic Macintosh computer to the revolutionary iPhone, iPad, and MacBook lineup, Apple's products combined cutting-edge technology with elegant design, setting new standards for usability, functionality, and style.</p>
      <p><strong>User-Centric Design:</strong> Steve Jobs emphasized the importance of user-centric design, intuitive interfaces, and seamless integration of hardware and software. Apple's products were designed to delight users, simplify complex tasks, and elevate the overall user experience, earning a loyal customer base and widespread acclaim for design excellence.</p>
      <p><em>“Design is not just what it looks like and feels like. Design is how it works.”</em> - Steve Jobs</p>
      <p><strong>Cultural Impact:</strong> Apple's influence extended beyond technology to culture, creativity, and lifestyle. The Apple ecosystem, including iTunes, the App Store, and iCloud, revolutionized digital content consumption, app development, and cloud services, shaping modern digital lifestyles and entertainment.</p>
      <p><strong>Innovation and Disruption:</strong> Steve Jobs' emphasis on innovation, risk-taking, and disruptive thinking fueled Apple's success in challenging traditional norms and redefining industry paradigms. His ability to envision products that customers didn't know they needed, such as the iPod, iTunes, and iPhone, disrupted markets and reshaped entire industries.</p>
      <p><em>“Stay hungry, stay foolish.”</em> - Steve Jobs</p>
      <p><strong>Legacy of Inspiration:</strong> Steve Jobs' legacy continues to inspire entrepreneurs, innovators, and leaders across diverse industries. His passion for excellence, commitment to quality, and relentless pursuit of perfection serve as guiding principles for those striving to make a meaningful impact through innovation, creativity, and visionary leadership.</p>
      <p><em>“Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.”</em> - Steve Jobs</p>
      <p><strong>Conclusion:</strong> Steve Jobs' legacy at Apple is synonymous with innovation, design excellence, and transformative impact. His vision, passion, and dedication to pushing the boundaries of technology continue to inspire generations, shaping the future of technology, design, and entrepreneurship.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [userUuids[3], userUuids[1], userUuids[0], userUuids[2]],
    userId: userUuids[6],
    tag: "tech",
  },
  {
    _id: blogUuids[20],
    image: "https://blognotf.s3.amazonaws.com/images/Steven-Wilson.jpg",
    title: "Progressive Rock: Exploring Musical Frontiers with Steven Wilson",
    content: `<p>Progressive rock, a genre known for its intricate compositions, diverse influences, and innovative approach to music, has seen a resurgence in recent years, thanks in part to visionary artists like Steven Wilson. As a multi-instrumentalist, songwriter, and producer, Steven Wilson has been at the forefront of the progressive rock movement, pushing boundaries, blending genres, and creating immersive musical experiences. Let's embark on a journey into the world of progressive rock and Steven Wilson's contributions to this dynamic genre.</p>
      <p><strong>The Evolution of Progressive Rock:</strong> Progressive rock emerged in the late 1960s and early 1970s, characterized by complex song structures, extended instrumental passages, and lyrical themes exploring philosophy, fantasy, and social commentary. Bands like Pink Floyd, Yes, Genesis, and King Crimson pioneered the genre, laying the foundation for its experimental and adventurous spirit.</p>
      <p><em>“Progressive rock is about pushing musical boundaries, embracing creativity, and crafting immersive sonic landscapes that transcend genres.”</em></p>
      <p><strong>Steven Wilson's Musical Journey:</strong> Steven Wilson, known for his work as the founder of Porcupine Tree and as a solo artist, has carved a niche in progressive rock with his distinctive sound, introspective lyrics, and meticulous production. His albums, including "Hand. Cannot. Erase.," "The Raven That Refused to Sing (And Other Stories)," and "To the Bone," showcase his versatility, musical craftsmanship, and storytelling prowess.</p>
      <p><strong>Genre Fusion and Experimentation:</strong> Steven Wilson's music transcends traditional genre boundaries, incorporating elements of rock, metal, jazz, electronic, and ambient music. His willingness to experiment with diverse sounds, textures, and production techniques creates a dynamic and immersive listening experience that resonates with fans of progressive music and beyond.</p>
      <p><em>“Innovation comes from embracing diversity, experimenting with new ideas, and fearlessly exploring musical territories that defy conventions.”</em></p>
      <p><strong>Conceptual Albums and Storytelling:</strong> Many of Steven Wilson's albums are conceptual in nature, weaving intricate narratives, themes, and characters into cohesive musical journeys. His storytelling ability, combined with evocative melodies and rich instrumentation, immerses listeners in cinematic experiences that evoke emotions, provoke thought, and invite introspection.</p>
      <p><strong>Production Excellence:</strong> As a producer, Steven Wilson is renowned for his attention to detail, sonic craftsmanship, and dedication to achieving sonic perfection. His studio expertise and innovative production techniques result in albums that are sonically rich, dynamic, and meticulously crafted, elevating the listening experience for audiophiles and music enthusiasts.</p>
      <p><em>“The art of production lies in capturing emotion, shaping soundscapes, and translating musical visions into immersive sonic experiences that resonate with listeners on a profound level.”</em></p>
      <p><strong>Legacy and Influence:</strong> Steven Wilson's contributions to progressive rock have left an indelible mark on the genre, inspiring a new generation of musicians, bands, and artists to explore musical frontiers, embrace creativity, and push the boundaries of what progressive music can achieve. His influence extends beyond the genre, shaping the landscape of modern rock and alternative music.</p>
      <p><em>“Music is a journey of discovery, expression, and connection. It transcends genres, boundaries, and limitations, inviting us to explore, evolve, and embrace the infinite possibilities of sonic artistry.”</em></p>
      <p><strong>Conclusion:</strong> Progressive rock, with its fusion of musical styles, intricate compositions, and thematic depth, continues to captivate audiences worldwide, thanks to visionary artists like Steven Wilson. As a creative force in the genre, Steven Wilson's contributions exemplify the spirit of exploration, innovation, and artistic expression that defines progressive rock's enduring appeal and relevance in contemporary music.</p>`,
    date: getRandomDate(
      new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      new Date()
    ),
    likes: [
      userUuids[5],
      userUuids[0],
      userUuids[2],
      userUuids[4],
      userUuids[1],
      userUuids[3],
    ],
    userId: userUuids[6],
    tag: "music",
  },
];

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const hashPasswords = async () => {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
};

const establishRandomFollowRelationships = async (userUuids) => {
  const db = client.db(dbName);
  const collection = db.collection(usersCollectionName);

  const shuffledUuids = [...userUuids].sort(() => Math.random() - 0.5);

  for (let i = 0; i < shuffledUuids.length; i++) {
    const followerId = shuffledUuids[i];
    const followeeIds = shuffledUuids.filter((id) => id !== followerId);

    const followeeCount = Math.floor(Math.random() * followeeIds.length) + 1;
    const randomFolloweeIds = followeeIds.slice(0, followeeCount);

    await collection.updateOne(
      { _id: followerId },
      { $addToSet: { following: { $each: randomFolloweeIds } } }
    );

    for (const followeeId of randomFolloweeIds) {
      await collection.updateOne(
        { _id: followeeId },
        { $addToSet: { followers: followerId } }
      );
    }
  }

  console.log("Random follow relationships established successfully!");
};

async function seedUsers() {
  try {
    await hashPasswords();

    const db = client.db(dbName);
    const collection = db.collection(usersCollectionName);

    await collection.insertMany(users);

    await establishRandomFollowRelationships(userUuids);

    console.log(`${users.length} users inserted successfully!`);
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

async function seedBlogs() {
  try {
    const db = client.db(dbName);
    const blogsCollection = db.collection(blogsCollectionName);

    await blogsCollection.insertMany(blogs);

    console.log(`${blogs.length} blogs inserted successfully!`);

    for (const newBlog of blogs) {
      const { _id, title, content } = newBlog;

      const elasticIndexResponse = await elasticClient.index({
        index: "newtest",
        id: _id,
        body: {
          title,
          content,
        },
      });
    }
    console.log(`Blogs indexed in Elasticsearch successfully`);
  } catch (error) {
    console.error("Error seeding blogs:", error);
  }
}

async function seedData() {
  try {
    if (!client.isConnected) {
      await client.connect();
    }

    await seedUsers();
    await seedBlogs();
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

seedData();
