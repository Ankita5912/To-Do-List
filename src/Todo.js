import { GrSearch } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

function ListWrapper({ task, priority, oncomplete, status, remove, edit }) {
  
  const priorityColors = {
    high: "bg-red-700 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-[#6f5794] text-white",
  };
  

  const priorityClass = priorityColors[priority.toLowerCase()] || "bg-gray-300 text-black";

  return (
    <div
      className={`py-2.5 px-4 rounded-sm shadow-sm w-full text-white shadow-[#cbd1ec] flex justify-between ${priorityClass}`}
    >
      <h1 className="font-Manrope text-base">{task}</h1>
      <div className="flex gap-5">
        <button onClick={edit}>
          <FaRegEdit size={20} fill="white"/>
        </button>
        <button onClick={remove}>
          <MdDeleteOutline size={22} fill="white" />
        </button>
        <button onClick={oncomplete}>
          <TiTick
            size={22}
            className={`rounded-full ${
              status ? "bg-green-800 text-white" : "bg-inherit border text-white border-white"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function Todo() {
  const [List, setList] = useState([]);
  const [Listitems, setlistitems] = useState({
    task: "",
    priority: "low",
    status: false,
  });
  const [editIndex, seteditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const data = localStorage.getItem("TodoList");
    if (data) setList(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(List));
  }, [List]);

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setlistitems({
      ...Listitems,
      [name]: value,
    });
  };

  const add = () => {
    if (Listitems.task.trim() === "") return alert("Enter your task");

    if (editIndex !== null) {
      const updatedList = [...List];
      updatedList[editIndex] = Listitems;
      setList(updatedList);
      seteditIndex(null);
    } else {
      setList([...List, Listitems]);
    }

    setlistitems({ task: "", priority: "low", status: false });
  };

  const updateStatus = (index) => {
    const updatedList = [...List];
    updatedList[index].status = !updatedList[index].status;
    setList(updatedList);
  };

  const ondelete = (index) => {
    const updatedList = [...List];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const edit = (index) => {
    setlistitems({ ...List[index] });
    seteditIndex(index);
  };

  const filteredList = List.filter((item) => {
    if (filter === "completed") return item.status;
    return true;
  }).sort((a, b) => {
    return sortOrder === "asc"
      ? a.task.localeCompare(b.task)
      : b.task.localeCompare(a.task);
  });

  return (
    <div className="bg-gradient-to-br from-[#909acf] to-[#967eba] h-screen">
      <nav className="flex justify-between p-4 bg-white shadow-md shadow-slate-500">
        <div className="font-semibold font-myFont md:text-3xl text-lg text-[#59437a] tracking-wider">
          QikList
        </div>
      </nav>

      <div className="flex flex-col pt-10 items-center h-auto">
        <h1 className="text-white font-PlusJakartaSans text-2xl font-semibold tracking-wide text-center leading-relaxed">
          Let’s make a quick list
        </h1>

        <div className="h-auto w-4/7 p-5 my-5 shadow-lg shadow-slate-500 bg-white flex flex-col gap-5 rounded-md">
          <div className="flex relative shadow-md rounded shadow-[#cbd1ec] border">
            <input
              type="text"
              className="w-full placeholder-opacity-35 font-Manrope text-base font-medium placeholder-[#6f5794] pl-8 py-2.5 rounded-sm outline-0"
              placeholder="Enter a task..."
              name="task"
              value={Listitems.task}
              onChange={handleonChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") add();
              }}
            />
            <button className="text-black p-2 py-3 absolute" style={{ cursor: "pointer" }}>
              <GrSearch color="#6f5794" size={20} />
            </button>

            <div className="flex gap-1">
              <select
                className="py-2.5 px-1 outline-none rounded-md bg-[#6f5794] border-r font-Manrope text-white text-center"
                name="priority"
                value={Listitems.priority}
                onChange={handleonChange}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <button
                className="bg-[#6f5794] font-Manrope text-white p-2 w-20 rounded-md rounded-r"
                onClick={add}
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-1">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded text-[#6f5794] bg-white"
            >
              <option value="all">Filter</option>
              <option value="all">All</option>
              <option value="completed">Completed</option>
            </select>

            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 bg-white border rounded text-[#6f5794]"
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>

          <div className="flex flex-col gap-4">
            {filteredList.map((item, index) => (
              <ListWrapper
                key={index}
                task={item.task}
                priority={item.priority}
                status={item.status}
                oncomplete={() => updateStatus(index)}
                remove={() => ondelete(index)}
                edit={() => edit(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
