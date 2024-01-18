const blog_data = [
  {
    id: 1,
    img:'tutorial.png',
    category: 'PDF',
    title: 'Setting up a simple parallel circuits',
    date: "Oct 10, 2022",
    comment: 9,
    desc: 'The curriculum aims to ignite a curiosity for innovation and underscore the real-world applications of electricity in their daily lives. By doing so, students will gain an appreciation for the significance of electrical knowledge across diverse fields,.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id: 2,
    img:'tutorial.png',
    category: 'LECTURE',
    title: 'How to test if the voltage is right',
    date: "Jan 10, 2022",
    comment: 15,
    desc: 'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore dol oremagna aliqua.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id: 3,
    img:'tutorial.png',
    category: 'BUSINESS',
    title: 'Setting up series circuits',
    date: "Feb 10, 2021",
    comment: 12,
    desc: 'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  // home 4
  {
    id: 4,
    img:'tutorial.png',
    category: 'ONLINE',
    title: 'Ensuring that there is a connection to computer',
    date: "JAN 10 2021",
    comment: 18,
    desc: 'Lorem ipsum dolor sit amet consec tetur adipisicing sed eiusmod tempor incid idunt labore.',
    author:'Edward',
    large:true,
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
{
    id:22,
    img:'tutorial.png',
    category:'Business',
    title:'Setting up a simple parallel circuits',
    date:'Jan 20, 2022',
    comment:'18',
    desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elnim veniam, quis nostrud exerec tation ullamco laboris nis aliquip.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },

  // blog masonry
  {
    id:23,
    img:'tutorial.png',
    category:'ONLINE',
    title:'Setting up a simple series circuits',
    date:'Sep 20, 2022',
    comment:'08',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:24,
    img:'blog-02.jpg',
    category:'Online Lecture',
    title:'Application and uses of lights',
    date:'Sep 15, 2022',
    comment:'10',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore dol oremagna aliqua.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:25,
    img:'blog-03.jpg',
    category:'Slide Show',
    title:'Innovation and Mind games for students',
    date:'Sep 17, 2022',
    comment:'12',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:26,
    img:'blog-19.jpg',
    category:'Images',
    title:'The STEM at hands with handson stem',
    date:'Oct 17, 2022',
    comment:'15',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore ad dolore magna aliqua enim mini veniam quis nostrud exercitation.ullamco laboris.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:27,
    img:'blog-21.jpg',
    category:'Lecture',
    title:'Does light have color, show it step by step',
    date:'Nov 15, 2022',
    comment:'20',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore dol oremagna aliqua.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:28,
    img:'blog-20.jpg',
    category:'Online Video',
    title:'Wrapping up and packing the devices',
    date:'Nov 20, 2022',
    comment:'13',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:29,
    img:'blog-23.jpg',
    category:'PDF',
    title:'Sources of energy and energy strength',
    date:'Nov 27, 2022',
    comment:'16',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore ad dolore magna aliqua enim mini veniam quis nostrud exercitation.ullamco laboris.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:30,
    img:'blog-24.jpg',
    category:'Online',
    title:'Measurement tools and how to use them',
    date:'Nov 29, 2022',
    comment:'22',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
  {
    id:31,
    img:'blog-22.jpg',
    category:'WORD',
    title:'Basic programing concept and appllication',
    date:'Nov 30, 2022',
    comment:'18',
    desc:'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt.',
    blog_masonry:true,
    downloadUrl:'https://res.cloudinary.com/dk4ruyonq/image/upload/v1705585934/STEMEXMANUAL_4_1a4dd0228b.pdf'
  },
]

export default blog_data;