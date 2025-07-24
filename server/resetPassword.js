import bcrypt from "bcryptjs";

const password = "saksham002";
const saltRounds = 10;

const hashPassword = async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("New Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

hashPassword();
