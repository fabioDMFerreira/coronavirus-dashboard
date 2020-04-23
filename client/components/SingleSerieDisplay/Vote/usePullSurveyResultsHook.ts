import { DataType, TimeType } from "client/types";
import fetch from "node-fetch";
import useSWR from "swr";

export default (dataType: DataType, timeType: TimeType, serieName: string, enabled: boolean): [boolean, number, number] => {

  if (!enabled) {
    return [false, 50, 50];
  }

  const { data, error } = useSWR(
    () => `/api/votes/results?dataType=${dataType}&timeType=${timeType}&resource=${serieName}`,
    (api) => fetch(api).then(res => res.json())
  )

  if (error) {
    return [false, 50, 50];
  } else if (!data) {
    return [true, 50, 50];
  } else {
    return [false, data.up, data.down];
  }
}
