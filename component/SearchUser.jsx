import { Select, Spin } from "antd";
import { useState, useCallback, useRef } from "react";
import api from "../lib/api";
import debounce from "lodash/debounce";

const Option = Select.Option;

export default function SearchUser({ onChange, value }) {
  //{current: 0}
  const lastFetchIdRef = useRef(0);
  //   const [fetchId, setFetchId] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchUser = useCallback(
    debounce((value) => {
      // console.log("fetching user", value);
      lastFetchIdRef.current += 1;
      const fetchId = lastFetchIdRef.current;
      setFetching(true);
      setOptions([]);
      api
        .request({
          url: `/search/users?q=${value}`,
        })
        .then((res) => {
          // console.log("user:", res);
          if (fetchId !== lastFetchIdRef.current) {
            return;
          }
          const data = res.data.items.map((user) => ({
            text: user.login,
            value: user.login,
          }));
          setFetching(false);
          setOptions(data);
        });
    }, 500),
    []
  );

  const handleChange = (value) => {
    setOptions([]);
    setFetching(false);
    onChange(value);
  };

  return (
    <Select
      style={{ width: 200 }}
      showSearch={true}
      notFoundContent={fetching ? <Spin size="small" /> : <span>none</span>}
      filterOption={false}
      placeholder="创建者"
      value={value}
      onChange={handleChange}
      onSearch={fetchUser}
      allowClear={true}
    >
      {options.map((option) => {
        <Option value={option.value} key={option.value}>
          {option.text}
        </Option>;
      })}
    </Select>
  );
}
