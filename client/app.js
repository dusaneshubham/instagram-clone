"use strict";

const app = angular.module("instagramApp", ["ui.router", "ngStorage"]);

app.config(function($stateProvider) {
    const indexState = {
        name: "index",
        url: "",
        templateUrl: "views/login.html",
    };
    $stateProvider.state(indexState);

    const loginState = {
        name: "login",
        url: "/login",
        templateUrl: "views/login.html",
    };
    $stateProvider.state(loginState);

    const signUpState = {
        name: "signup",
        url: "/signup",
        templateUrl: "views/signup.html",
    };
    $stateProvider.state(signUpState);

    const sendMailState = {
        name: "send-mail",
        url: "/sendmail",
        templateUrl: "views/send-mail.html"
    };
    $stateProvider.state(sendMailState);

    const emailVerifyState = {
        name: "email-verificaion",
        url: "/emailverification",
        templateUrl: "views/email-verification.html"
    };
    $stateProvider.state(emailVerifyState);

    const forgetPass = {
        name: "forget-pass",
        url: "/forget-pass",
        templateUrl: "views/forget-pass.html"
    };
    $stateProvider.state(forgetPass);

    const forgetPassEmail = {
        name: "forget-pass-email",
        url: "/forget-pass-email",
        templateUrl: "views/forget-pass-email.html"
    };
    $stateProvider.state(forgetPassEmail);

    const homeState = {
        name: "home",
        url: "/home",
        templateUrl: "views/home.html",
    };
    $stateProvider.state(homeState);

    const profileState = {
        name: "profile",
        url: "/profile/:id",
        templateUrl: "views/profile.html",
    };
    $stateProvider.state("profile", profileState);

    $stateProvider.state("otherwise", {
        url: "*path",
        templateUrl: "views/error-not-found.html",
    });
});

// take email for forget pass
app.controller('forget-pass-email', ($scope, $http, $location) => {
    $scope.error = false;
    $scope.loadingSpinnerBtn = false;
    $scope.success = false;
    $scope.loadingSpinnerBtn = false;

    $scope.submitBtn = () => {
        $scope.loadingSpinnerBtn = true;
        let data = {
            email: $scope.email
        }

        $http.post("http://localhost:2700/send-forget-pass-email", data)
            .then((response) => {
                $scope.loadingSpinnerBtn = false;
                if (response.data.success === 1) {
                    $scope.success = true;
                    $scope.error = false;
                    $scope.successMessage = response.data.message;
                } else {
                    $scope.success = false;
                    $scope.error = true;
                    $scope.errorMessage = response.data.error;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

// forget pass
app.controller('forgetPass', ($scope, $http, $location) => {
    $scope.error = false;
    $scope.loadingSpinnerBtn = false;

    $scope.submitBtn = () => {
        $scope.error = false;
        let password = $scope.password;
        let cpassword = $scope.rePassword;
        $scope.loadingSpinnerBtn = true;
        let passwordRegex = /^[a-zA-Z0-9$_.#@<>?*%]{8,30}$/;
        if (password && cpassword) {
            if (password === cpassword) {
                if (passwordRegex.test(password)) {

                    const data = {
                        token: $location.search().token,
                        password: password
                    }

                    $http.post('http://localhost:2700/forget-pass', data)
                        .then((response) => {
                            $scope.loadingSpinnerBtn = false;
                            if (response.data.success === 1)
                                window.location.replace('http://localhost:5500/client/')
                            else {
                                $scope.error = true;
                                $scope.errorMessage = "Invalid Token!";
                            }
                        })
                        .catch((err) => {
                            $scope.error = true;
                            $scope.errorMessage = "Something went wrong!";
                        })
                } else {
                    $scope.loadingSpinnerBtn = false;
                    $scope.error = true;
                    $scope.errorMessage = "Please Enter Strong password!";
                }
            } else {
                $scope.loadingSpinnerBtn = false;
                $scope.error = true;
                $scope.errorMessage = "Password and Confirm password not match!";
            }
        } else {
            $scope.loadingSpinnerBtn = false;
            $scope.error = true;
            $scope.errorMessage = "All field are required!";
        }
    }
})

// email-verification
app.controller('email-verification', ($scope, $http, $location) => {
    $scope.loadingSpinnerBtn = false;
    $scope.errorAlert = false;
    $scope.emailVerify = () => {
        $scope.loadingSpinnerBtn = true;
        const token = $location.search().token;
        $http.post("http://localhost:2700/emailverification", { token })
            .then((response) => {
                if (response.data.success === 1) {
                    $http.post("http://localhost:2700/register", response.data.user)
                        .then((response) => {
                            if (response.data.success === 1)
                                window.location.replace('http://localhost:5500/client/');
                            else {
                                $scope.loadingSpinnerBtn = false;
                                $scope.errorAlert = true;
                                $scope.error = response.data.error;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    $scope.loadingSpinnerBtn = false;
                    $scope.errorAlert = true;
                    $scope.error = response.data.error;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

// sign up
app.controller('signupCtrl', ($scope, $http, $location) => {
    $scope.error = false;
    $scope.loadingSpinnerBtn = true;

    $scope.registerBtn = () => {
        let password = $scope.password;
        let cpassword = $scope.cpassword;
        let fullname = $scope.fullname;
        let username = $scope.username;
        let email = $scope.email;

        let usernameRegex = /^[a-zA-Z]([a-zA-Z0-9._$]){2,29}$/;
        let passwordRegex = /^[a-zA-Z0-9$_.#@<>?*%]{8,30}$/;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (password && cpassword && fullname && username && email) {

            if (usernameRegex.test(username)) {

                if (emailRegex.test(email)) {

                    if (passwordRegex.test(password)) {

                        if (password === cpassword) {
                            let userData = {
                                username: username,
                                fullname: fullname,
                                email: email,
                                password: password,
                            }
                            $scope.error = false;
                            $scope.loadingSpinnerBtn = false;
                            $http.post("http://localhost:2700/sendmail", userData)
                                .then((response) => {
                                    $scope.loadingSpinnerBtn = true;
                                    if (response.data.success === 1) {
                                        $location.path('/sendmail');
                                    } else {
                                        $scope.error = true;
                                        $scope.errorMessage = response.data.error;
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                })

                        } else {
                            $scope.error = true;
                            $scope.loadingSpinnerBtn = true;
                            $scope.errorMessage = "Passwords do not match!";
                        }

                    } else {
                        $scope.error = true;
                        $scope.loadingSpinnerBtn = true;
                        $scope.errorMessage = "Passwords length must be greater than 8.";
                    }

                } else {
                    $scope.error = true;
                    $scope.loadingSpinnerBtn = true;
                    $scope.errorMessage = "Invalid Email";
                }

            } else {
                $scope.error = true;
                $scope.loadingSpinnerBtn = true;
                $scope.errorMessage = "Username must be in range 3 to 30 and can start only with alphabets and not contain space ";
            }

        } else {
            $scope.error = true;
            $scope.loadingSpinnerBtn = true;
            $scope.errorMessage = "All fields are required!";
        }
    }
});


// login
app.controller('loginCtrl', ($scope, $http, $location, $localStorage) => {
    $scope.error = false;
    $scope.loadingSpinnerBtn = true;
    $scope.errorMessage = ""

    const data = {
        token: localStorage.getItem("token")
    };

    $http.post('http://localhost:2700/auth', data)
        .then((response) => {
            if (response.data.success === 1) {
                $location.path('/home');
            }
        })
        .catch((err) => {
            console.log(err);
        })

    $scope.loginBtn = () => {
        let password = $scope.password;
        let username = $scope.username;

        if (password && username) {

            let userData = {
                username: username,
                password: password
            }
            $scope.error = false;
            $scope.loadingSpinnerBtn = false;
            $http.post("http://localhost:2700/login", userData)
                .then((response) => {
                    $scope.loadingSpinnerBtn = true;
                    console.log(response);
                    if (response.data.success === 1) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                        $location.path('/home');
                    } else {
                        $scope.error = true;
                        $scope.errorMessage = response.data.error;
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            $scope.error = true;
            $scope.loadingSpinnerBtn = true;
            $scope.errorMessage = "All fields are required!";
        }
    }
});


// home
app.controller('homeCtrl', ($scope, $http, $location, $localStorage, $document) => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");


    let data = {
        token: token
    };

    $http.post('http://localhost:2700/auth', data)
        .then((response) => {
            if (response.data.success === 0) {
                $location.path('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })

    if (!token && !user) {
        $location.path('/login');
    }

    // fetch all post of my following or mine post

    const myFollowingPosts = () => {
        $http.post('http://localhost:2700/post/myfollowing', { token })
            .then((res) => {
                $scope.allPost = res.data;
                console.log(res.data);
                let sinceCreatedAt;

                $scope.getSinceTime = (index) => {
                    sinceCreatedAt = (new Date().getTime() - new Date(res.data[index].createdAt).getTime()) / 1000;

                    if (sinceCreatedAt < 60) {
                        return Math.floor(sinceCreatedAt) + ' second ago';
                    } else if (sinceCreatedAt >= 60 && sinceCreatedAt < 3600) {
                        return Math.floor(sinceCreatedAt / 60) + ' min ago';
                    } else if (sinceCreatedAt >= 3600 && sinceCreatedAt < 86400) {
                        return Math.floor(sinceCreatedAt / 3600) + ' hour ago';
                    } else if (sinceCreatedAt >= 86400 && sinceCreatedAt < 2592000) {
                        return Math.floor(sinceCreatedAt / 86400) + ' day ago';
                    } else if (sinceCreatedAt >= 2592000 && sinceCreatedAt < 31536000) {
                        return Math.floor(sinceCreatedAt / 2592000) + ' month ago';
                    } else {
                        return Math.floor(sinceCreatedAt / 31536000) + ' year ago';
                    }
                }
            }).catch(err => {
                console.log(err);
            })
    }

    myFollowingPosts();

    $scope.like = (id) => {
        console.log(id)
        $document[0].getElementById(id).style = "display: none";
        $document[0].getElementById('un' + id).style = "display: inline-block";
        $document[0].getElementById('un' + id).style.animation = "like 400ms";

        $http.put(`http://localhost:2700/post/like/${id}`, { token })
            .then(res => {
                console.log(res.data)
                myFollowingPosts();
            });
    }

    $scope.disLike = (id) => {
        $document[0].getElementById(id).style = "display: inline-block";
        $document[0].getElementById('un' + id).style = "display: none !important";
        $document[0].getElementById(id).style.animation = "disLike 400ms"

        $http.put(`http://localhost:2700/post/dislike/${id}`, { token })
            .then(res => {
                console.log(res.data)
                myFollowingPosts();
            });
    }

    $scope.dbClick = (id) => {
        $document[0].getElementById("big" + id).style = "display: inherit"
        $document[0].getElementById("big" + id).style.animation = "big-like 400ms"
        setTimeout(() => {
            $document[0].getElementById("big" + id).style = "display:none"
        }, 700)
        $scope.like(id)
        myFollowingPosts(id);
    }

});


// profile
app.controller('profileCtrl', ($scope, $http, $stateParams, $window) => {
    let token = localStorage.getItem("token");
    let username = $stateParams.id;
    $scope.currentUserForButton = false;
    $scope.followButton = true;
    let currentUser = JSON.parse(localStorage.getItem('user'));

    let data = {
        token: token
    };

    $http.post('http://localhost:2700/auth', data)
        .then((response) => {
            if (response.data.success === 0) {
                $location.path('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })


    if (!token && !user) {
        $location.path('/login');
    } else {
        $http.get(`http://localhost:2700/user/profile/${username}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((response) => {
                $scope.userProfile = response.data;
                if ($scope.userProfile.userData._id === currentUser._id) {
                    $scope.currentUserForButton = true;
                } else {
                    if ($scope.userProfile.userData.follower.includes(currentUser._id)) {
                        $scope.followButton = false;
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    $scope.follow = () => {
        $http.put(`http://localhost:2700/user/follow/${$scope.userProfile.userData._id}`, { token })
            .then((response) => {
                $scope.followButton = false;
                console.log(response);
                $window.location.reload();
            }).catch((err) => {
                console.log(err);
            });
    }

    $scope.unFollow = () => {
        $http.put(`http://localhost:2700/user/unfollow/${$scope.userProfile.userData._id}`, { token })
            .then((response) => {
                $scope.followButton = true;
                console.log(response);
                $window.location.reload();
            }).catch((err) => {
                console.log(err);
            });
    }
});



app.controller('myOwn', ($scope) => {
    $scope.denis = "https://picsum.photos/200/300";
});



app.controller('postFileCtrl', ($scope, $http, $location, $localStorage) => {
    $scope.error = false;
    $scope.spinnerBtn = false;
    $scope.icon = true;
    $scope.btn = true;
    $scope.submitBtn = false;
    $scope.spinnerBtn = false;
    $scope.carousel = false;
    $scope.btnValue = "Select from your device";
    $scope.images = [];
    $scope.active = true;
    $scope.activeIndex = 0;

    $scope.flushImages = () => {
        $scope.images = [];
        document.getElementById('input-post-image').value = '';
        $scope.description = "";
        $scope.carousel = false;
        $scope.location = "";
        $scope.showPreviewImages();
        if ($scope.images.length <= 10) {
            $scope.error = false;
        }
    }

    $scope.showPreviewImages = () => {
        console.log(`In preview func : ${$scope.images.length}`);
        if ($scope.images.length) {
            $scope.icon = false;
            $scope.btnValue = "Add Post";
            $scope.submitBtn = true;
        } else {
            $scope.icon = true;
            $scope.btnValue = "Select from your device";
            $scope.submitBtn = false;
        }
    }

    $scope.postImagePreview = (element) => {
        $scope.$apply(() => {
            let inputImages = element.files;
            console.log($scope.images.length);
            for (let i = 0; i < inputImages.length; i++) {
                if (i == 10) {
                    $scope.error = true;
                    $scope.errorMessage = "Only 10 files are allowed.";
                    break;
                }
                $scope.images.push({
                    "name": inputImages[i].name,
                    "url": URL.createObjectURL(inputImages[i]),
                    "file": inputImages[i]
                })
            }
            console.log($scope.images);
            $scope.showPreviewImages();
        });
        $scope.showPreviewImages();
    }

    $scope.next = () => {
        $scope.carousel = true
    }

    $scope.back = () => {
        $scope.carousel = false
    }

    $scope.submit = () => {
        $scope.spinnerBtn = true;
        let token = localStorage.getItem("token");
        let file = new FormData();
        file.append("token", token);
        file.append("location", $scope.location);
        file.append("description", $scope.description);
        $scope.images.forEach(element => {
            file.append("photo", element.file);
        });
        console.log(file)

        $http.post("http://localhost:2700/post/createpost", file, {
                headers: {
                    "Content-Type": undefined,
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                $scope.spinnerBtn = false;
                if (response.data.success === 1)
                    console.log(response)
                if (response.data.success === 0) {
                    $scope.error = true;
                    $scope.errorMessage = response.data.error;
                }
            }).catch((err) => {
                console.log(err);
            });
    }
})