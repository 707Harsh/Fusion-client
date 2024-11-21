// import "./leaveStatus.css"; // Import the CSS file
// import React from "react";
// import { useSelector } from "react-redux";
// import { Table, Paper } from "@mantine/core";

// function LeaveStatus() {

//   const roll = useSelector((state) => state.user.roll_no);
//   const name = useSelector((state) => state.user.username);

//   const data = [
//     {
//       rollNo: "67890",
//       name: "Jane Smith",
//       branch: "ECE",
//       dateFrom: "2024-12-15",
//       dateTo: "2024-12-31",
//       leaveType: "Medical",
//       attachment: "Medical_attachment.pdf",
//       purpose:
//         "Purpose of leave here Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae enim non officia unde repellat, vel atque neque cupiditate dolore reiciendis adipisci, nisi voluptatibus aut earum nobis amet dignissimos, nemo qui!",
//       address:
//         "Address here Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae enim non officia unde repellat, vel atque neque cupiditate dolore reiciendis adipisci, nisi voluptatibus aut earum nobis amet dignissimos, nemo qui!",
//       action: "Pending",
//     },
//   ];

//   return (
//     <Paper className="responsive-table-container">
//       <div className="table-wrapper" style={{ marginTop: "50px" }}>
//         <Table striped highlightOnHover className="status-table">
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   borderRight: "1px solid white",
//                   borderLeft: "1px solid black",
//                   textAlign: "center",
//                 }}
//               >
//                 Roll No
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Name
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Branch
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Date From
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Date To
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Leave Type
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Attachment
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Purpose
//               </th>
//               <th
//                 style={{ borderRight: " 1px solid white", textAlign: "center" }}
//               >
//                 Address
//               </th>
//               <th
//                 style={{ borderRight: "1px solid black", textAlign: "center" }}
//               >
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid black" }}>{item.rollNo}</td>
//                 <td style={{ border: "1px solid black" }}>{item.name}</td>
//                 <td style={{ border: "1px solid black" }}>{item.branch}</td>
//                 <td style={{ border: "1px solid black" }}>{item.dateFrom}</td>
//                 <td style={{ border: "1px solid black" }}>{item.dateTo}</td>
//                 <td style={{ border: "1px solid black" }}>{item.leaveType}</td>
//                 <td style={{ border: "1px solid black" }}>{item.attachment}</td>
//                 <td style={{ border: "1px solid black" }}>{item.purpose}</td>
//                 <td style={{ border: "1px solid black" }}>{item.address}</td>
//                 <td
//                   style={{
//                     color: `${item.action === "Pending" ? "orange" : item.action === "Approved" ? "green" : "red"}`,
//                     border: "1px solid black",
//                   }}
//                 >
//                   {item.action}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Paper>
//   );
// }

// export default LeaveStatus;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Paper } from "@mantine/core";
import axios from "axios"; // Import axios for API requests
import { Get_Leave_Requests } from "../../../routes/otheracademicRoutes/index";

function LeaveStatus() {
  // Get roll_no and username from Redux state
  const roll = useSelector((state) => state.user.roll_no);
  const name = useSelector((state) => state.user.username);

  const authToken = localStorage.getItem("authToken");
  // console.log(authToken);

  const [data, setData] = useState([]); // State to store fetched leave requests

  useEffect(() => {
    // Fetch leave data when component mounts
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(Get_Leave_Requests, {
          headers: {
            Authorization: `Token ${authToken}`, // Include the token in the Authorization header
          },
          params: {
            roll_no: roll, // Include query parameters here
            username: name,
          },
        });

        console.log(response);

        setData(response.data); // Set the response data into state
      } catch (error) {
        console.error("Error fetching leave requests!", error);
      }
    };

    if (roll && name) {
      fetchLeaveRequests(); // Fetch leave requests if roll_no and username are available
    }
  }, [roll, name]); // Re-run effect if roll_no or username changes

  return (
    <Paper className="responsive-table-container">
      <div className="table-wrapper" style={{ marginTop: "50px" }}>
        <Table striped highlightOnHover className="status-table">
          <thead>
            <tr>
              <th
                style={{
                  borderRight: "1px solid white",
                  borderLeft: "1px solid black",
                  textAlign: "center",
                }}
              >
                Roll No
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Name
              </th>
              {/* <th style={{ borderRight: "1px solid white", textAlign: "center" }}>Branch</th> */}
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Date From
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Date To
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Leave Type
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Attachment
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Purpose
              </th>
              <th
                style={{ borderRight: "1px solid white", textAlign: "center" }}
              >
                Address
              </th>
              <th
                style={{ borderRight: "1px solid black", textAlign: "center" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>{item.rollNo}</td>
                <td style={{ border: "1px solid black" }}>{item.name}</td>
                {/* <td style={{ border: "1px solid black" }}>{item.branch}</td> */}
                <td style={{ border: "1px solid black" }}>{item.dateFrom}</td>
                <td style={{ border: "1px solid black" }}>{item.dateTo}</td>
                <td style={{ border: "1px solid black" }}>{item.leaveType}</td>
                <td style={{ border: "1px solid black" }}>{item.attachment}</td>
                <td style={{ border: "1px solid black" }}>{item.purpose}</td>
                <td style={{ border: "1px solid black" }}>{item.address}</td>
                <td
                  style={{
                    color: `${
                      item.action === "Pending"
                        ? "orange"
                        : item.action === "Approved"
                          ? "green"
                          : "red"
                    }`,
                    border: "1px solid black",
                  }}
                >
                  {item.action}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}

export default LeaveStatus;
