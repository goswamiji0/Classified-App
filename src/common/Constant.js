const Constant = {




    //User Management Api - 
    Signup: "signup/",
    Login: "login/",
    ForgotPassword: "forgot-password/",
    ChangePassword: "change-password/",
    GetCategory: "news/category/",
    Category: "news/user-category/",
    SubCategory: "news/sub-category/",
    Logout: "logout/",
    GetProfile: "user-profile/",
    NewsCard: "news/newscard/",
    FavoriteNewsCard: "news/favorite-news/",
    ArchiveFavoriteNewsCard: "news/newscard/?type=favorite",
    GetReport: "news/report-news/?User=1&Email=nhzvikas@yopmail.com",
    Reportnews: "news/report-news/",











    AccountDelete: "Your account has been deleted by admin",



    Email_length: 62,
    fullname_length: 60,
    State_length: 35,
    City_length: 35,
    firstname_length: 30,
    lastname_length: 30,
    phoneMax_length: 15,
    About_me_length: 1000,
    Otp_length: 4,
    Password_length: 15,
    zipCode_length: 10,
    description_length: 1000,
    Rental_Price_length: 7,//charactor
    max_Bedrooms: 99,
    max_Baathroom: 99,
    max_dictance: 4,//charactor
    max_filter_Price: 7,//charactor
    max_Sq_ft: 6,//charactor
    min_Sq_ft: 3,//charactor





    //Alerts Make sure your device is connected to the internet
    APIPost: "POST",
    APIGET: "GET",
    APIPUT: "PUT",
    APIImageUploadAndroid: "POST_UPLOAD",
    kAppName: "Tea Talk",
    kInternetError: "You're offline \n Please check internet connection.",
    kUserDetailsAPIError: "Sorry, something wrong your account please contact us admin team.",










    EnterMobileError: "Please enter mobile number.",
    EnterMobileLengthError: "Mobile number should be minimum 7 characters.",
    kEnterOTPNumberError: "Please enter OTP.",
    EnterusernameError: "Please enter first name.",
    EnteruserlastnameError: "Please enter last name.",
    EnterusernamelengthErrorthree: "First Name should be minimum 3 characters.",
    EnteruserlastnamelengthErrorthree: "Last Name should be minimum 3 characters.",

    kEnterselectError: "Please select one.",
    kAgreebuyerError: "Please select only buyer.",
  

    EnterusernamelengthError: "Name should be minimum 10 characters.",
    EnterEmailError: "Please enter email.",
    EnterVaildEmailError: "Please enter valid email.",
    EntercountryError: "Please enter country code.",
   
    EnterPasswordError: "Please enter password.",
    PasswordAcceptableLengthError: "Password should be minimum 8 characters.",
    kAgreeTermsPolicyError: "Please agree to our Terms and conditions.",
    EnterConfirmPasswordError: "Please enter confirm password.",
    EnterConfirmPasslengthError: "Confirm Password should be minimum 8 characters.",
    EnterPasswordConfirmSameError: "Password & Confirm Password should be the same.",
    PasswordConfirmAcceptableLengthError: "Password should be minimum 15 characters.",
    EnterOldPassError: "Please enter old password.",
    EnterOldPasslengthError: "Old Password should be minimum 8 characters.",
    EnterNewPassError: "Please enter new password.",
    EnterNewPasslengthError: "New Password should be minimum 8 characters.",
    kLogoutMsg: "Are you sure you want to Log out?",
    kSelectcategory: "Please select category",
    kEnterlanguageError: "Please select your language.",
    kEntercupError: "Please select your cup.",
    kEntergenderError: "Please select your gender.",
    kEnterpartnerError: "Please select your partner.",


    EnterquantityError: "Please enter your quantity.",



    EnterPasswordSpecialError: "Password must contain, Atleast one uppercase, lowercase letters, numbers and special characters",
    EnterConfirmPasswordSpecialError: "Confirm Password must contain, Atleast one uppercase, lowercase letters, numbers and special characters",
    EnterOldPasswordSpecialError: "Old Password must contain, Atleast one uppercase, lowercase letters, numbers and special characters",
    EnterNewPasswordSpecialError: "New Password must contain, Atleast one uppercase, lowercase letters, numbers and special characters",



    kAPIError: "Sorry, something went wrong.",
    kEmailMatchingError: "Email address doesn't match.",
    kSelectCountryCodeError: "Please select country code.",
    kMobileNumError: "Please enter phone number.",
    kAboutMeError: "Please enter About Me.",
    kPasswordsMatchingError: "Password doesn't match.",
    kValidOTPNumberError: "Please enter valid OTP.",
    kResendPhoneNumberError: "Please send phone number first.",
    kEnterZipCodeError: "Please enter ZIP Code.",
    kEnterZipCodeLengthError: "ZIP Code should be minimum 5 characters.",
    kEnterDOBError: "Please select birth Year.",
    kEnterGenderError: "Please select gender.",
    kEnterRestaurantNameError: "Please enter restaurant name.",
    kEnterRestaurantAddError: "Please enter restaurant address.",
    kEnterRestaurantZipCodeError: "Unable to fetch zipcode from selected address.",
    kEnterKitchenNameError: "Please enter kitchen name.",
    kSelectRestaurantCountryCodeError: "Please select restaurant country code.",
    kPhoneNumError: "Please change your phone number.",
    kFNameError: "Please change your first name.",
    kFLastError: "Please change your last name.",
    kEmailChangeError: "Please change your email.",
    kAboutChangeError: "Please change About Me.",
    kPhoneNumLengthError: "Phone number should be minimum 7 characters.",
    kOtpNumLengthError: "OTP should be 4 characters.",

    kEnterRestaurantWebsiteError: "Please enter restaurant website.",
    kEnterAboutRestaurantError: "Please enter details for about us.",
    kEnterVerificationCode: "Please enter verification code.",
    kResendVerificationMail: "Do you want to resend verification link to registered email?",
    kEmailOrPhoneAlreadyExistError: "Email or Phone number already exist.",



    kEnterConfirmPassError: "Please enter confirm password.",

    kEnterNotPassMatchError: "New Password and Confirm Password did not match.",

    kFBError: "Sorry, something wrong \n Please login again with facebook.",


    kEnterLicenceError: "Please enter license number.",
    kEnterBrokerNameError: "Please enter broker name.",


    kEnterStateError: "Please enter state",
    kEnterStreetError: "Please select Street",
    kEnterAddressError: "You must first enter your address",

    kEnterCityError: "Please enter city.",
    kEnterZipcodeError: "Please enter Postalcode/Zipcode.",

    kEnterLivingAreaError: "Please enter Living Area.",
    kEnterVaildLivingAreaError: "Please enter vaild Living Area.",

    kEnterDescriptionError: "Please enter Description.",
    kEnterRentalPriceError: "Please enter Rental Price.",
    kEnterRentalPriceVaildError: "Please enter vaild Rental Price.",
    kEnterRentalDepVaildError: "Please enter vaild Rental Deposit.",

    kEnterRentalDepositError: "Please enter Rental Deposit.",
    kDeleteImageMsg: "Are you sure you want to delete this property image?",
    kDeleteVideoMsg: "Are you sure you want to delete this property video?",

    kDeleteQuestionMsg: "Are you sure you want to delete this question?",
    kDeletePropertyMsg: "Are you sure you want to delete this property?",
    kDeleteTenantMsg: "Are you sure you want to delete this tenant?",
    kDeleteRequestMsg: "Are you sure you want to delete this rental request?",



    kaddImagesError: "Please add at least 5 images.",
    kQuestionError: "Please enter question.",
    kselectQuestionError: "Please select at least 1 question.",
    kCreateQuestionError: "Please add at least 1 question.",
    kCategorySelectError: "Please select at least 1 category.",
    kEnterCommentError: "Please enter comment or Add at least 1 image.",
    kEnterQuestionError: "Please enter question or Add at least 1 image.",
    kLocationError: "Device location off! \n Switch on your device location to improve your property experience.",
    kDraftAlert: "Please select an option?",
    kDeviceLocationError: "Sorry, something wrong \n Please check your Device location Permission On.",
    kAddQError: "You can only 3 question add.",
    KEmailVerify: "Email send your email id Please verify",
    KLocationNotFound: "Location not found",
    KStartDate: "Please select start date.",
    KEndDate: "Please select end date.",
    KReportMsg: "Please enter report message.",
    KErrorOwnerMsg: "Please enter message.",

    KVideoError: "Sorry, you can't select video.",
    KshareLink: "Check out this property I found on Rentzy!",
    KCopied: "Copied",
    KSelectStartDate: "Please select start date first.",
    KInviteUserLink: "Please download the rentzy app and register - ",
    KTenantUser: "Please select tenant",
    KleaseAgreementError: "Please upload lease agreement.",
    kDeleteLeaseAgreementMsg: "Are you sure you want to delete this lease agreement?",
    kRequestError: "Sorry, you can't apply to your property.",
    kAlreadyRequestError: "You already requested this property.",
    kTimeError: "This time is gone.",
    kTimeSloatError: "Please select appointment time.",
    kSelfTimeSloatError: "You can't select appointment time for your property.",
    kAlreadyFeaturedError: "Property is already featured.",


}

export default Constant;
