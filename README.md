Faceless

https://face-less.herokuapp.com/

This is a social media where a user can remain anonymous and post to a message board. We find it restrictive to the user expeience to have to create an account for every social media site that you are a part of, so we designed one where you dont have to sign up - you are assigned a random username, and you have to contribute to view the message board.

We wanted to achieve the following ideas:
A) prevent lurking (people who only access the site and don't contribute by making users contribute to gain access to the message board and thus creating a community with lots of contents
C) Assign a randomly generated username to a current user to uphold anonymity and be able spill their deepest darkest SECRETS. Is this controversial? We dont know (yik yak was shut down in 2017). We will continue research to make this platform as safe as possible.
D) This app was built using a MERN stack (Mongo, Express, React, Node.js).


Key Features:
Randomly Generated Usernames
Users can only vote once on each post (until refresh)
Users can only access the message board after a post
A post is deleted if it gets less than -3 votes.

FUTURE:

There's plenty of room for development:  

-Use different components for each of the functions within the app; seperate the voting system, the comments, and the initial post creation

-We can most definitely improve on its aesthetics

-Creart sorting functions to sort through posts- by date, by popularity, by alphabetical username etc...

-In the future, we'd like to also implement some type of community/location based post visability

-Dates/times for comments model and associated usernames for comments

-When we get 100,000 posts per DAY, we will implement a feature that will render x more posts upon clicking see more

-Be able to link pictures vie url as well as our document uploader (easy work we'll do this quickly)

-implement a live refresh... if users vote on a post, it simultaneously renders any new posts, however these posts lose voting function - BUG!

-Format the comment section so it is easier on the eyes

-change position/style of vote buttons - ion-icons broke the functionality

-button for dark mode

click on the face in order to get new posts that allows you to see new posts/vote

currently, users can just go to the site and do fake requests and input whatever votes/username they want by submitting requests to the server side... so they can essentially bypass the client side code.. we'll find a way to fix that!
a friend posted this: 

formData = new FormData();
formData.append('username', 'ez');
formData.append('body', 'like this');
axios.post('/posts', formData, {headers: {'Content-Type': 'form-data'}}); will need to fix!

-Cavell W and Ryan F

