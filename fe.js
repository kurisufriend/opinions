function generate()
{
    console.log("running~");

    let loc = window.location.search.substr(1);

    fetch("/opinions.json")
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(function(brain) {
        if (brain[loc] == undefined) {loc = "";}

        document.getElementById("title")
        .innerText = loc == "" ? "OPINIONS" : loc;

        document.getElementById("header-title")
        .innerHTML = brain[loc]["title"];

        document.getElementById("content")
        .innerHTML = brain[loc]["content"];

        Object.keys(brain).forEach(function(frag) {
            if (frag == "") {return}

            let item = document.createElement("div");
            item.className = "sidebar-entry";
            item.innerText = brain[frag]["title"]

            let wrap = document.createElement("a")
            wrap.href = "/?"+frag;
            wrap.appendChild(item);

            document.getElementById("sidebar")
            .appendChild(wrap)

            console.log(frag);
        });
    });

}