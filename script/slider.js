document.querySelectorAll(".slider").forEach((e) => {
    const b = e.querySelector(".wrapp"),
        lb = e.querySelector(".btn-left"),
        rb = e.querySelector(".btn-right"),
        w = e.offsetWidth,
        c = b.querySelectorAll(".item").length;
    let p = 0,
        bul,
        timerId,
        d = e.querySelector(".dots");

    e.dataset.looped == "true" ? (bul = true) : (bul = false);

    if (e.dataset.autoSlide == 'true') {
        timerId = setInterval(autoSlide, e.dataset.time);
    }

    createDot();
    checkDott();
    if (!bul) checkBtn();
    rb.addEventListener("click", () => {
        autoSlide();
        clearInterval(timerId);
    });
    lb.addEventListener("click", () => {
        if (bul) {
            (p == 0) ? p = (c - 1) * w: p -= w;
        } else {
            p -= w;
        }
        b.style = `transform: translateX(-${p}px)`;
        if (!bul) checkBtn();
        checkDott();
        clearInterval(timerId);
    });

    function checkBtn() {
        if (p == 0) {
            lb.setAttribute("disabled", "disabled");
        } else if (p == w * (c - 1)) {
            rb.setAttribute("disabled", "disables");
        } else {
            lb.removeAttribute("disabled");
            rb.removeAttribute("disabled");
        }
    }

    function createDot() {
        for (let i = 0; i < c; i++) {
            let sp = document.createElement("span");
            sp.setAttribute("data-link", i);
            d.append(sp);
        }
        d.querySelectorAll("span").forEach((s) => {
            s.addEventListener("click", () => {
                p = s.dataset.link * w;
                b.style = `transform: translateX(-${p}px)`;
                checkBtn();
                checkDott();
            });
        });
    }

    function checkDott() {
        let q = 0;
        d.querySelectorAll("span").forEach((k) => {
            if (p / w == q) {
                if (!k.classList.contains("active")) k.classList.add("active");
            } else {
                k.classList.remove("active");
            }
            q++;
        });
    }

    function autoSlide() {
        if (bul) {
            (p == (c - 1) * w) ? p = 0: p += w;
        } else {
            p += w;
        }
        b.style = `transform: translateX(-${p}px)`;
        if (!bul) checkBtn();
        checkDott();
    }
});