import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PersonIcon from '@material-ui/icons/Person';

export const breadCumConstant = {
    positiocreate: {
        title: "Create a Position",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Opening" },
        ],
        backroute: '/openings'
    },
    positionPreview: {
        title: "Create a Position : Preview",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Create a Position" },
        ]
    },
    manageOpening: {
        title: "Manage Opening",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Opening" },
        ],
        backroute: '/dashboard'
    },
    
    manageEmployee: {
        title: "Manage Employees",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Manage Employees" },
        ],
        backroute: '/dashboard'
    },
    createEmployee: {
        title: "Manage Employees",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Create Employees" },
        ],
        backroute: '/employee/manage'
    },
    organisationChart: {
        title: "Organization Chart Manager",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Organization Chart Manager" },
        ],
        backroute: '/dashboard'
    },
    candidateList: {
        title: "Candidates List",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Employee" },
            { icon: <AccountTreeIcon />, navTitle: "Candidates List" },
        ],
        backroute: '/dashboard'
    },
    candidateDetails: {
        title: "Candidate Details",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Candidates List" },
            { icon: <AccountTreeIcon />, navTitle: "Candidate Details" },
        ],
        backroute: '/onboarding'
    },
    workshift: {
        title: "Work Shift Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Masters" },
            { icon: <AccountTreeIcon />, navTitle: "Work Shift" },
        ],
        backroute: '/master'
    },
    leaveMaster: {
        title: "Leave Master",
        navArr: [
            { icon: <DescriptionIcon />, navTitle: "Masters" },
            { icon: <AccountTreeIcon />, navTitle: "Leave" },
        ],
        backroute: '/master'
    },
    manageHoliday: {
        title: "Holiday Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Master" },
            { icon: <AccountTreeIcon />, navTitle: "Holiday Master" },
        ],
        backroute: '/master'
    },
    manageOnBoardingDoc: {
        title: "OnBoarding Doc Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Master" },
            { icon: <AccountTreeIcon />, navTitle: "OnBoarding Doc Master" },
        ],
        backroute: '/master'
    },
    manageMasters: {
        title: "Masters",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Masters" },
        ],
        backroute: '/dashboard'
    },

    departmentMaster: {
        title: "Department Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Master" },
            { icon: <AccountTreeIcon />, navTitle: "Department" },
        ],
        backroute: '/master'
    },

    leaveforapproval: {
        title: "Leave For Approval",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Leave for Approval" },
        ]
    },

    employeeAttendance: {
        title: "Employee Attendance",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Employee Attendance" },
        ],
        backroute: '/dashboard'
    },
    manageAttendance: {
        title: "My Attendance",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Attendance Management" },
            { icon: <AccountTreeIcon />, navTitle: "My Attendance" },
        ],
        backroute: 'attendance'
       
    },

    manageApprover: {
        title: "Approver Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Master" },
            { icon: <AccountTreeIcon />, navTitle: "Approver master" },
        ],
        backroute: '/master'
    },

    manageinterviewer: {
        title: "Interviewer Master",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Master" },
            { icon: <AccountTreeIcon />, navTitle: "Interviewer master" },
        ],
        backroute: '/master'
    },
    companyProfile: {
        title: "Company Profile",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "My Profile" },
        ],
        backroute: '/dashboard'
    },

    affirmation: {
        title: "Affirmation",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Affirmation" },
        ],
        backroute: '/dashboard'
    },

    gratitude: {
        title: "Gratitude",
        navArr: [
            { icon: <DashboardIcon />, navTitle: "Dashboard" },
            { icon: <AccountTreeIcon />, navTitle: "Gratitude" },
        ],
        backroute: '/dashboard'
    },
    dummyOrgChart: {
        title: "Dummy Organization Chart",
        navArr: [
            { icon: <AccountTreeIcon />, navTitle: "Organistion Chart" },
            { icon: <AccountTreeIcon />, navTitle: "Dummy Organization Chart" },
        ],
        backroute: '/organization'
    },
    myprofile: {
        title: "My Profile",
        navArr: [
            { icon: <DashboardIcon/>, navTitle: "Dashboard" },
            { icon: <PersonIcon/>, navTitle: "My Profile" }    
        ],
        backroute: "/dashboard"

    }

}