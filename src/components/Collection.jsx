import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { useGetMoneyReciptQuery } from "../features/api/authApi";
import convertToBengaliNumber from "../util/convertToBengaliNumber";


export default function Collection() {

  const { data, isFetching } = useGetMoneyReciptQuery();
 

  return (
    <div className="overflow-auto h-[250px]">
      <hr />
      {
        isFetching && 'Loading...'
      }
      {data?.recipt.map((d) => (
        <div className=" flex gap-2 justify-between items-center border p-1 mt-4" key={d._id}>
          <div>
            <span>{d.name}    - </span>
            <span className="ml-10">{convertToBengaliNumber(d.total || 0)} টাকা </span>
          </div>
          <br />
          <span className="text-gray-500">
            {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  );
}
