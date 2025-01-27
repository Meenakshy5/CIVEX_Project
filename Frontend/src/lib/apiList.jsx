
export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  recruiters:`${server}/admin/recruiterinfos`,
  approveRecruiter:(id) => `${server}/admin/recruiterinfos/${id}`,
  deleteRecruiter:(id) => `${server}/admin/recruiterinfos/${id}`,
  dashboardStats: `${server}/admin/dashboard/stats`
};

export default apiList;
