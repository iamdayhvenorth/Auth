export const EMAILVERIFICATION = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="padding: 20px">
    <div
      style="
        width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #fa8232;
        overflow: hidden;
      "
    >
      <div
        style="
          width: 100%;
          color: white;
          background-color: #fa8232;
          padding: 5px;
        "
      >
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: 700">
          Verify Your Email
        </h2>
      </div>
      <div style="padding: 20px">
        <p>Hello,</p>
        <p>Thank you for signing up!, please use the code below to verify your email.</p>
        <div style="text-align: center; margin: 30px 0; font-size: 2rem;color: #fa8232;letter-spacing:2px;">
          <span>{verificationCode}</span>
        </div>
        <p>This code will expire in 10 minutes</p>
        <p>
          If you didn&apos;t create an account with us, please ignore this
          email.
        </p>
        <div style="margin: 10px 0; text-align: left;">
          <p>Best regards,</p>
          <p>DaveCodeSolutions.</p>
        </div>
      </div>
    </div>
  </body>
</html>


`
export const VERIFICATION_SUCCESSFUL = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="padding: 20px">
    <div
      style="
        width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #fa8232;
        overflow: hidden;
      "
    >
      <div
        style="
          width: 100%;
          color: white;
          background-color: #fa8232;
          padding: 5px;
        "
      >
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: 700">
          Success
        </h2>
      </div>
      <div style="padding: 20px">
        
        <p>Your email has been verified successfully</p>
        
        <p>
          If you didn&apos;t make this request, please ignore this mail.
        </p>
        <div style="margin: 10px 0; text-align: left;">
          <p>Best regards,</p>
          <p>DaveCodeSolutions.</p>
        </div>
      </div>
    </div>
  </body>
</html>


`

export const FORGOT_PASSWORD = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="padding: 20px">
    <div
      style="
        width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #fa8232;
        overflow: hidden;
      "
    >
      <div
        style="
          width: 100%;
          color: white;
          background-color: #fa8232;
          padding: 5px;
        "
      >
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: 700">
         Password Reset Link
        </h2>
      </div>
      <div style="padding: 20px">
        <p>Hello {name},</p>
        <p>You just requested for a password reset link. Please click on the link below to reset your password.</p>
      
        <p>Link: <a href="{resetLink}">Reset password link</a></p>
        
        <p>This code will expire in 10 minutes</p>
        <p>
          If you didn&apos;t request for reset link, please ignore this email.
        </p>
        <div style="margin: 10px 0; text-align: left;">
          <p>Best regards,</p>
          <p>DaveCodeSolutions.</p>
        </div>
      </div>
    </div>
  </body>
</html>


`

export const RESET_SUCCESSFUL = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="padding: 20px">
    <div
      style="
        width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #fa8232;
        overflow: hidden;
      "
    >
      <div
        style="
          width: 100%;
          color: white;
          background-color: #fa8232;
          padding: 5px;
        "
      >
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: 700">
          Reset Successful
        </h2>
      </div>
      <div style="padding: 20px">
        
        <p>Your password  been reset successfully</p>
        
        <div style="margin: 10px 0; text-align: left;">
          <p>Best regards,</p>
          <p>DaveCodeSolutions.</p>
        </div>
      </div>
    </div>
  </body>
</html>


`

export const CHANGE_PASSWORD = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="padding: 20px">
    <div
      style="
        width: 500px;
        margin: 0 auto;
        border-radius: 4px;
        border: 1px solid #fa8232;
        overflow: hidden;
      "
    >
      <div
        style="
          width: 100%;
          color: white;
          background-color: #fa8232;
          padding: 5px;
        "
      >
        <h2 style="text-align: center; font-size: 1.5rem; font-weight: 700">
         Password Update
        </h2>
      </div>
      <div style="padding: 20px">
        <p>Hello {name},</p>
        <p>You just changed your password.</p>
        <p>
          If this action was not performed by you, kindly contact the support or send a password reset link.
        </p>
        <div style="margin: 10px 0; text-align: left;">
          <p>Best regards,</p>
          <p>DaveCodeSolutions.</p>
        </div>
      </div>
    </div>
  </body>
</html>


`