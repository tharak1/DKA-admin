

interface CourseModel{
    id?:string;
    category?:string;
    courseName?:string;
    description?:string;
    online?:boolean;
    offline?:boolean;
    sessions?:string[];
    price?:string;
    image?:string;
    showActions?:boolean;
    coursePerformance?:string[];
    ageLimit:string;
    courseCountry:string;
    coursesSold?:number;
}

interface MyCourseModal{
    courseId: string;
    courseName:string;
    boughtDate:string;
    paymentId:string;
    status?:string;
    courseType: "offline" | "online";
    courseSession: string;
    branch: string;
    endDate:string;
}

export type {CourseModel, MyCourseModal };