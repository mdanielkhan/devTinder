#DevTinder Apis


authRouter
 -POST/Signup  //done
 -POST/login   //done
 -POST/logout  //done

 ProfileRouter
  -GET/profile/view
  -PATCH/profile/view
  -PATCH/profile/password

 ConnectionRequestRouter
  -POST/request/send/interersted/:userId
  -POST/request/send/ignored/:userId
  -POST/request/review/accepted/:requestId
  -POST/request/review/:requestId

 UsserRouter
  -GET/user/connections
  -GET/user/requests
  -GET/user/feed -Gets you the profiles of other users on the platfrom

  status: ignore, interested, accepted, rejected