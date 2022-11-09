console.log("running~");

let inited = false;
let b = fetch("/opinions.json")
.then(res => res.text())
.then(res => JSON.parse(res))

function generate(loc)
{
    b.then(function(brain) {
        if (brain[loc] == undefined) {loc = "";}

        document.getElementById("title")
        .innerText = loc == "" ? "OPINIONS" : loc;

        document.getElementById("header-title")
        .innerHTML = brain[loc]["title"];

        history.pushState(history.state, loc, "/?"+loc);

        document.getElementById("content")
        .innerHTML = brain[loc]["content"];

        if (inited) {return}
        Object.keys(brain).forEach(function(frag) {
            if (frag == "") {return}

            let item = document.createElement("div");
            item.className = "sidebar-entry";
            item.innerText = brain[frag]["title"]
            item.onclick = function() {generate(frag)};

            document.getElementById("sidebar")
            .appendChild(item)
        });
        inited = true;
    });

}