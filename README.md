hoodie-plugin-paranoia
====================
[![Build Status](https://travis-ci.org/greenlizard/hoodie-plugin-paranoia.svg?branch=master)](https://travis-ci.org/greenlizard/hoodie-plugin-paranoia) [![Dependencies](https://david-dm.org/greenlizard/hoodie-plugin-paranoia.png)](https://david-dm.org/greenlizard/hoodie-plugin-paranoia) [![devDependency Status](https://david-dm.org/greenlizard/hoodie-plugin-paranoia/dev-status.svg)](https://david-dm.org/greenlizard/hoodie-plugin-paranoia#info=devDependencies) [![Code Climate](https://codeclimate.com/github/greenlizard/hoodie-plugin-paranoia/badges/gpa.svg)](https://codeclimate.com/github/greenlizard/hoodie-plugin-paranoia)

## Dependencies
```shell
  hoodie install hoodie-plugin-paranoia
```
for cordova/phonegap users
```shell
  bower install hoodie-plugin-paranoia
```

## Setup client
```html
 <script src="/_api/_files/hoodie.js"></script>
```
for cordova/phonegap users

```html
  <script src="<bowerdir>/hoodie/dist/hoodie.js"></script>
  <script src="<bowerdir>/hoodie-plugin-paranoia/hoodie.paranoia.js"></script>
```

## API (Dream Code)
-  [x] hoodie.paranoia.follow(login)
-  [x] hoodie.paranoia.unfollow(login)
-  [x] hoodie.paranoia.post({text: 'text'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.paranoia.getPost({id: 'postId')
-  [x] hoodie.paranoia.updatePost({id: 'postId',text: 'text'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.paranoia.deletePost({id: 'postId'}, /*opitional*/ {type: [plugin.enum]})
-  [x] hoodie.paranoia.comment(postId, {text:'text'})
-  [x] hoodie.paranoia.updateComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.paranoia.deleteComment({ id: 'postId'}, {id: 'commentId'})
-  [x] hoodie.paranoia.count(postId, [type.enum]) 
-  [x] hoodie.paranoia.uncount(postId, [type.enum])
-  [x] hoodie.paranoia.like(postId) 
-  [x] hoodie.paranoia.unlike(postId)
-  [x] hoodie.paranoia.feed(postId)
-  [x] hoodie.paranoia.share(postId)
-  [x] hoodie.paranoia.abuse(postId)
-  [x] hoodie.paranoia.following(/*opitional*/ login)
-  [x] hoodie.paranoia.followers(/*opitional*/ login)
-  [x] hoodie.paranoia.getProfile(/*opitional*/ login)
-  [x] hoodie.paranoia.updateProfile(/*opitional*/ login, profileObject)
