export const errorMessages = {
  // Controller errors
  userNotFound: {
    en: "User not found",
    ka: "მომხმარებელი ვერ მოიძებნა",
  },
  invalidCredentials: {
    en: "Invalid email or password",
    ka: "არასწორი ელ-ფოსტა ან პაროლი",
  },
  invalidRefreshToken: {
    en: "Access denied. Invalid refresh token.",
    ka: "წვდომა უარყოფილია. არასწორი refresh ტოკენი.",
  },
  invalidAccessToken: {
    en: "Access denied. Invalid access token.",
    ka: "წვდომა უარყოფილია. არასწორი access ტოკენი.",
  },
  jwtSecretNotProvided: {
    en: "JWT secrets not provided.",
    ka: "JWT secret-ების მოწოდება აუცილებელია.",
  },
  noTokenProvided: {
    en: "Access denied. No token provided.",
    ka: "წვდომა უარყოფილია. ტოკენის მოწოდება აუცილებელია",
  },
  verificationCodeExpired: {
    en: "Verification code expired",
    ka: "ვერიფიკაციის კოდი ვადა ამოეწურა",
  },
  verificationCodeStillValid: {
    en: "verification code is still valid",
    ka: "ვერიფიკაციის კოდის ვადა ჯერ არ არის გასული",
  },
  unauthorized: {
    en: "Authorization failed.",
    ka: "ავტორიზაცია წარუმატებლად დასრულდა.",
  },
  verificationRequired: {
    en: "Verification required.",
    ka: "ვერიფიკაცია აუცილებელია.",
  },
  verificationExpired: {
    en: "Verification expired. Please request a new code.",
    ka: "ვერიფიკაციის ვადა ამოიწურა. გთხოვთ, მოითხოვოთ ახალი კოდი.",
  },
  adminAuthenticateFailed: {
    en: "Admin authentication failed.",
    ka: "ადმინისტრატორის ავტორიზაცია წარუმატებლად დასრულდა.",
  },

  // Messages
  verificationSuccessful: {
    en: "Verification successful",
    ka: "ვერიფიკაცია წარმატებით დასრულდა",
  },
  loginSuccessful: {
    en: "Login successful",
    ka: "შესვლა წარმატებით დასრულდა",
  },
  verificationCodeResent: {
    en: "Verification code resent successfully",
    ka: "ვერიფიკაცის კოდი წარმატებით გამოიგზავნა ხელახლა",
  },
  codeSent: {
    en: "Code sent successfully",
    ka: "კოდი წარმატებით გამოიგზავნა",
  },
  codeVerified: {
    en: "Code verified successfully",
    ka: "კოდი ვერიფიცირებულია",
  },
  tokenRefreshed: {
    en: "Token refreshed",
    ka: "ტოკენი განახლდა",
  },
  imageUploaded: {
    en: "Image uploaded successfully",
    ka: "სურათი წარმატებით აიტვირთა",
  },

  // Validation errors
  invalidEmail: {
    en: "Invalid email",
    ka: "ელ-ფოსტა არასწორია",
  },
  emailAlreadyExists: {
    en: "User with this email already exists",
    ka: "მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს",
  },
  invalidFirstName: {
    en: "Invalid first name",
    ka: "სახელი არასწორია",
  },
  invalidLastName: {
    en: "Invalid last name",
    ka: "გვარი არასწორია",
  },
  invalidPersonalId: {
    en: "Invalid personal ID",
    ka: "პირადი ნომერი არასწორია",
  },
  personalIdLength: {
    en: "Personal ID must be between 9 and 20 characters long",
    ka: "პირადი ნომერი უნდა იყოს 9-დან 20 სიმბოლომდე სიგრძის",
  },
  invalidPassword: {
    en: "Invalid password",
    ka: "პაროლი არასწორია",
  },
  passwordLength: {
    en: "Password must be between 8 and 100 characters long",
    ka: "პაროლი უნდა იყოს 8-დან 100 სიმბოლომდე სიგრძის",
  },
  invalidConfirmPassword: {
    en: "Invalid confirm password",
    ka: "პაროლის გადამოწმება არასწორია",
  },
  passwordsNotMatch: {
    en: "Passwords must match",
    ka: "პაროლები არ ემთხვევა",
  },
  invalidId: {
    en: "Invalid id",
    ka: "id არასწორია",
  },
  invalidCode: {
    en: "Invalid OTP code",
    ka: "OTP კოდი არასწორია",
  },
  passwordChanged: {
    en: "Password changed",
    ka: "პაროლი შეიცვალა",
  },
  invalidResetPasswordType: {
    en: "Reset password type is invalid",
    ka: "პაროლის აღდგენის ტიპი არასწორია",
  },
} as const;

export type ErrorKey = keyof typeof errorMessages;
export type TranslatedMessage = (typeof errorMessages)[ErrorKey];
