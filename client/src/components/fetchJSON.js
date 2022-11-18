

const fetchJSON = async (str) => {
    const res = await fetch(str);
    const data = await res.json();
    //console.log(data.total_pages);
    return data;
}

export default fetchJSON