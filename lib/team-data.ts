export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  hover: string;
  linkedin?: string;
  website?: string;
};

export type TeamGroup = {
  title: string;
  compact?: boolean;
  members: TeamMember[];
};

const U = "https://softsaro.com.np/uploads/";

export const teamGroups: TeamGroup[] = [
  {
    title: "Management",
    compact: true,
    members: [
      { name: "Sujan Adhikari", role: "Chairman", photo: U + "team_Y5nNWBwb.jpeg", hover: U + "team_hover_opGRglmO.png", linkedin: "https://www.linkedin.com/in/sujanadhikari1111/" },
      { name: "Binaya Neupane", role: "Chief Executive Officer (CEO)", photo: U + "team_1Nl0LEmx.png", hover: U + "team_hover_LvH24zqA.png" },
      { name: "Santosh Rajbanshi", role: "Chief Operating Officer ( COO )", photo: U + "team_2KvrDNGk.jpg", hover: U + "team_hover_r3uGkBJl.png", linkedin: "https://www.linkedin.com/in/santosh-rajbanshi-878552152/" },
      { name: "Krishna Prasad Khanal", role: "Business Development Officer (BDO)", photo: U + "team_OAXv8Rti.jpeg", hover: U + "team_hover_ilFGqS7c.jpg" },
    ],
  },
  {
    title: "Team",
    members: [
      { name: "Anup Kasula", role: "Technical Director | Senior FullStack Developer", photo: U + "team_mblkC7UV.png", hover: U + "team_hover_Ei5HYvnO.jpeg", website: "https://www.anupkasula.com.np/", linkedin: "https://www.linkedin.com/in/anup-kasula/" },
      { name: "Aabishkar Shrestha", role: "Technical Director | Senior FullStack Developer", photo: U + "team_3OVcLtBd.png", hover: U + "team_hover_xZi1CWJz.jpeg", website: "https://aabishkarshrestha.com.np/", linkedin: "https://www.linkedin.com/in/aabishkar-shrestha-550545247/" },
      { name: "Aryan Miya Mansoor", role: "Technical Director | Digital Marketing Manager", photo: U + "team_DXhq6Qun.png", hover: U + "team_hover_yMm3WbCc.jpeg", website: "https://aryanmiyamansoor.com.np/", linkedin: "https://www.linkedin.com/in/aryan-miya-mansoor-0b8b95324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { name: "Rhythem Phuyal", role: "Project Manager", photo: U + "team_R8MJrIwF.png", hover: U + "team_hover_1gyWUz7l.png", linkedin: "https://www.linkedin.com/in/rhythemphuyal/" },
      { name: "Jenish Prajapati", role: "Junior Web Developer", photo: U + "team_9FuD2CZ5.png", hover: U + "team_hover_wLi4XeBn.jpeg", website: "https://www.prajapatijenish.com.np", linkedin: "https://www.linkedin.com/in/prajapati-jenish-b9a3bb191/" },
      { name: "Dhiraj Kumar Sarraf", role: "Junior Web Developer", photo: U + "team_GsS0ipOd.png", hover: U + "team_hover_0vMFA75T.png", website: "http://dhirajsarraf.com.np", linkedin: "https://www.linkedin.com/in/dhirajs16/" },
      { name: "Kushal Poudel", role: "Junior Web Developer", photo: U + "team_HsKQmGCn.png", hover: U + "team_hover_72YUBFot.jpeg", website: "https://kushalpoudel2060.com.np/", linkedin: "https://www.linkedin.com/in/kushal-poudel-317b25241/" },
      { name: "Alok Kharel", role: "Junior Web Developer", photo: U + "team_kuTRdYib.png", hover: U + "team_hover_coLQWfrM.jpeg" },
      { name: "Urmila K.c", role: "Content Writer & Creator", photo: U + "team_wrSHKGtQ.png", hover: U + "team_hover_Z43z6RwE.jpeg" },
      { name: "Smriti Sanjyal", role: "Junior Web Developer", photo: U + "team_BuAdHIF2.png", hover: U + "team_hover_0Nj3BU2X.png", website: "https://smiriti.com.np", linkedin: "https://www.linkedin.com/in/smriti-sanjyal-5a9151233/" },
      { name: "Shreejan Shrestha", role: "UI/UX & Graphic Designer", photo: U + "team_Yjfp61kb.png", hover: U + "team_hover_SIq4d2uc.png", website: "https://shreecode19.github.io/shreejan-shrestha/", linkedin: "https://www.linkedin.com/in/shreejan-shrestha11/" },
      { name: "Naresh Dhakal", role: "Digital Marketing Expert", photo: U + "team_h41ZA3kU.png", hover: U + "team_hover_Ugr2SbzT.png", website: "https://www.nareshkumardhakal.com.np/" },
      { name: "Shriya Shakya", role: "Social Media Executive", photo: U + "team_EtB7pNyo.png", hover: U + "team_hover_Z24kgCEl.png", linkedin: "https://www.linkedin.com/in/shriya-shakya-989488317" },
      { name: "Aaditya Raj Shah", role: "SEO & Digital Marketing Intern", photo: U + "team_ZEd7nka2.png", hover: U + "team_hover_P9aYJSFB.jpeg", linkedin: "https://www.linkedin.com/in/aadityarajshah/" },
      { name: "Sokim Rana", role: "Video Editor", photo: U + "team_wHGp2Nv1.png", hover: U + "team_hover_LfpQOPFN.png" },
      { name: "Dil Maya Kafle", role: "Sales Manager", photo: U + "team_m2dL8gWl.png", hover: U + "team_hover_h3gUrjIS.png" },
    ],
  },
];