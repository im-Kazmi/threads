export const fakeUsers = [
    {
      id: 1,
      name: "John Doe",
      image: "https://images.pexels.com/photos/4720385/pexels-photo-4720385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://images.pexels.com/photos/4715325/pexels-photo-4715325.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 3,
      name: "Alice Johnson",
      image: "https://images.pexels.com/photos/4721131/pexels-photo-4721131.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];
 export const followings = [
    {
      id: 1,
      name: "Abid kazmi",
      image: "https://images.pexels.com/photos/5560020/pexels-photo-5560020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      name: "izhar kazmi",
      image: "https://images.pexels.com/photos/8421939/pexels-photo-8421939.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 3,
      name: "john smith",
      image: "https://images.pexels.com/photos/13710211/pexels-photo-13710211.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
        id: 4,
        name: "Stephen brider",
        image: "https://images.pexels.com/photos/4715335/pexels-photo-4715335.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
  ];
  export const fakePost = {
    id: 1,
    title: "Sunset",
    content: "Captured this breathtaking sunset on my recent trip.",
    image: "https://images.pexels.com/photos/4938507/pexels-photo-4938507.jpeg?auto=compress&cs=tinysrgb&w=400",
    author: {
      id: 101,
      name: "John Doe",
      location:"Afghanistan",
      profileImage: "https://images.pexels.com/photos/4720385/pexels-photo-4720385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    likes: 42,
    unlikes: 3,
    commentsCount: 5,
    comments: [
      {
        id: 201,
        text: "Wow, that's truly beautiful!",
        author: {
          id: 102,
          name: "Abid kazmi",
          profileImage: "https://images.pexels.com/photos/5560020/pexels-photo-5560020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
      },
      {
        id: 202,
        text: "Incredible Scene!",
        author: {
          id: 103,
          name: "Izhar kazmi",
          profileImage: "https://images.pexels.com/photos/8421939/pexels-photo-8421939.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
      },
    ],
  };
  export const fakeUser = {
    id: 101,
    name: "John Doe",
    email:"johndoe123@gmail.com",
    profileImage: "https://images.pexels.com/photos/943235/pexels-photo-943235.jpeg?auto=compress&cs=tinysrgb&w=400",
    coverPhoto:"https://images.pexels.com/photos/1420701/pexels-photo-1420701.jpeg?auto=compress&cs=tinysrgb&w=400",
    postsCount: 15,
    followersCount: 500,
    followingCount: 200,
  };

  export const fakeStories = [
    {
      id: 1,
      author: {
        id: 201,
        name: "Emily Johnson",
        profileImage: "https://images.pexels.com/photos/7125131/pexels-photo-7125131.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      content: "Exploring the city streets and found this hidden gem of a cafe!",
      image: "https://images.pexels.com/photos/6203360/pexels-photo-6203360.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      timestamp: "2023-08-10 15:30",
      views: 120,
      reactions: {
        thumbsUp: 48,
        heart: 15,
        laughing: 7,
      },
    },
    {
      id: 2,
      author: {
        id: 202,
        name: "Alex Smith",
        profileImage: "https://images.pexels.com/photos/7125010/pexels-photo-7125010.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      content: "Hiking in the mountains and witnessed this breathtaking sunrise!",
      image: "https://images.pexels.com/photos/6203344/pexels-photo-6203344.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      timestamp: "2023-08-11 07:15",
      views: 210,
      reactions: {
        thumbsUp: 60,
        heart: 20,
        wow: 10,
      },
    },
    {
      id: 3,
      author: {
        id: 203,
        name: "Sophia Williams",
        profileImage: "https://images.pexels.com/photos/7125005/pexels-photo-7125005.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      },
      content: "Attended a live music concert last night. The energy was electrifying!",
      image: "https://images.pexels.com/photos/6203316/pexels-photo-6203316.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      timestamp: "2023-08-12 22:00",
      views: 300,
      reactions: {
        heart: 40,
        clapping: 12,
        fire: 8,
      },
    },
    ,
  {
    id: 4,
    author: {
      id: 204,
      name: "Liam Anderson",
      profileImage: "https://images.pexels.com/photos/7124995/pexels-photo-7124995.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    content: "Cooked my first gourmet meal! Proud of how it turned out.",
    image: "https://images.pexels.com/photos/6203300/pexels-photo-6203300.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    timestamp: "2023-08-13 18:45",
    views: 150,
    reactions: {
      heart: 35,
      thumbsUp: 20,
      chef: 5,
    },
  },
  ];
  