
import Transactions from "../transactions/transactions.mongo";

export async function getRevenueByDimension(dimension: string){
     try{
        const result = await Transactions.aggregate([
            {
                // Match transactions where status is 'succeeded'
                $match: { status: "succeeded" }
            },
            {
                // Unwind the array of courseDetails so we can work with individual courses
                $unwind: "$courseDetails"
            },
            {
                // Lookup to join courses based on courseId from the Transactions
                $lookup: {
                    from: "courses", // The name of the Courses collection
                    localField: "courseDetails.courseId", // Field in Transactions
                    foreignField: "_id", // Field in Courses
                    as: "courseInfo" // The field name to store joined data
                }
            },
            {
                // Unwind courseInfo since it's an array from the $lookup
                $unwind: "$courseInfo"
            },
            {
                // Group by the requested dimension and sum the revenue
                $group: {
                    _id: `$courseInfo.${dimension}`, // Group by the dimension (e.g., category)
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$courseInfo.price", "$courseDetails.quantity"] // Calculate revenue
                        }
                    }
                }
            }
        ]);
    
        return result;
     }
     catch(err){
        return err
     }
}
