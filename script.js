(() => {
    "use strict";

    const $ = (id) => document.getElementById(id);

    const screens = {
        home: $("screen-home"),
        register: $("screen-register"),
        needs: $("screen-needs"),
        advice: $("screen-advice"),
        cv: $("screen-cv"),
        portfolio: $("screen-portfolio")
    };

    let user = null;
    let currentNeed = null;
    let cvPhotoData = "";
    let projects = [];

    const adviceData = {
        Artista: {
            curriculum: [
                ["Perfil", "Explica qué tipo de artista eres y qué te diferencia."],
                ["Experiencia", "Incluye exposiciones, proyectos, colaboraciones y estudios relevantes."],
                ["Claridad", "Mantén el CV ordenado y fácil de leer."]
            ],
            portfolio: [
                ["Selección", "Muestra tus mejores obras, no todo lo que has realizado."],
                ["Orden", "Agrupa los trabajos para mostrar una evolución."],
                ["Presentación", "Usa imágenes claras y títulos sencillos."]
            ],
            interview: [
                ["Proceso", "Explica cómo desarrollas una idea hasta convertirla en obra."],
                ["Portafolio", "Debes poder explicar cada proyecto que muestras."],
                ["Valor", "Relaciona tu experiencia con las necesidades del puesto."]
            ]
        },
        Fotógrafo: {
            curriculum: [
                ["Especialidad", "Indica si trabajas en retrato, eventos, producto, editorial, etc."],
                ["Experiencia", "Destaca clientes y proyectos relevantes."],
                ["Herramientas", "Incluye equipo y software que dominas."]
            ],
            portfolio: [
                ["Series", "Muestra proyectos o series coherentes."],
                ["Selección", "Es mejor pocas fotografías excelentes que muchas repetitivas."],
                ["Calidad", "Cuida la presentación de tus imágenes."]
            ],
            interview: [
                ["Decisiones", "Explica luz, composición y equipo."],
                ["Clientes", "Cuenta cómo resolviste sus necesidades."],
                ["Profesionalismo", "Habla de tiempos y entregas."]
            ]
        },
        Ilustrador: {
            curriculum: [
                ["Especialidad", "Resume qué tipo de ilustración realizas."],
                ["Proyectos", "Prioriza trabajos relacionados con el puesto."],
                ["Herramientas", "Incluye programas y técnicas que dominas."]
            ],
            portfolio: [
                ["Estilo", "Tu selección debe representar tu identidad visual."],
                ["Proceso", "Incluye bocetos y etapas cuando ayuden."],
                ["Objetivo", "Selecciona trabajos pensando en el empleo que buscas."]
            ],
            interview: [
                ["Proceso creativo", "Explica cómo recibes un encargo y llegas a una propuesta."],
                ["Cambios", "Cuenta cómo trabajas con revisiones."],
                ["Decisiones", "Explica por qué elegiste determinados recursos."]
            ]
        },
        Diseñador: {
            curriculum: [
                ["Especialidad", "Define tu área dentro del diseño."],
                ["Resultados", "Explica problemas que solucionaste."],
                ["Herramientas", "Menciona programas que realmente dominas."]
            ],
            portfolio: [
                ["Casos de estudio", "Explica problema, proceso y resultado."],
                ["Proceso", "Muestra bocetos, pruebas o iteraciones."],
                ["Rol", "Aclara qué parte del proyecto realizaste tú."]
            ],
            interview: [
                ["Decisiones", "Explica el razonamiento detrás de tus elecciones."],
                ["Problemas", "Prepara ejemplos concretos."],
                ["Equipo", "Explica cómo colaboras con otros profesionales."]
            ]
        },
        Pintor: {
            curriculum: [
                ["Perfil", "Explica tu tipo de pintura y técnicas."],
                ["Exposiciones", "Incluye muestras y proyectos relevantes."],
                ["Técnicas", "Menciona las técnicas que dominas."]
            ],
            portfolio: [
                ["Colección", "Construye una selección coherente."],
                ["Imágenes", "Cuida las fotografías de las obras."],
                ["Información", "Incluye título, técnica y año cuando aporte valor."]
            ],
            interview: [
                ["Lenguaje visual", "Explica temas e ideas presentes en tu trabajo."],
                ["Técnica", "Describe cómo desarrollas una obra."],
                ["Aporte", "Relaciona tu experiencia con el proyecto."]
            ]
        },
        Animador: {
            curriculum: [
                ["Especialidad", "Indica si trabajas en 2D, 3D, motion, personajes o VFX."],
                ["Proyectos", "Prioriza trabajos relacionados con el puesto."],
                ["Software", "Menciona herramientas que dominas."]
            ],
            portfolio: [
                ["Reel", "Crea un reel breve y coloca tus mejores trabajos primero."],
                ["Proceso", "Muestra storyboard, layouts o pruebas."],
                ["Objetivo", "Selecciona trabajos según el puesto."]
            ],
            interview: [
                ["Proceso", "Explica desde la idea hasta la animación final."],
                ["Producción", "Habla de tiempos, cambios y entregas."],
                ["Colaboración", "Demuestra trabajo en equipo."]
            ]
        },
        Otro: {
            curriculum: [
                ["Perfil", "Explica claramente qué haces y qué oportunidad buscas."],
                ["Experiencia", "Prioriza lo más relevante."],
                ["Habilidades", "Selecciona habilidades útiles para el puesto."]
            ],
            portfolio: [
                ["Selección", "Muestra proyectos que representen tus mejores habilidades."],
                ["Orden", "Usa categorías y títulos claros."],
                ["Objetivo", "Piensa en lo que necesita el empleador."]
            ],
            interview: [
                ["Proyectos", "Conoce y explica tus principales trabajos."],
                ["Ejemplos", "Prepara historias concretas."],
                ["Aporte", "Relaciona tus habilidades con el puesto."]
            ]
        }
    };

    function getAdviceForProfession(profession) {
        return adviceData[profession] || adviceData.Otro;
    }

    function showScreen(name) {
        const next = screens[name];
        if (!next) return;

        const active = Object.values(screens).find(
            (screen) => !screen.classList.contains("screen-hidden")
        );

        if (!active || active === next) {
            Object.values(screens).forEach((screen) => {
                screen.classList.toggle("screen-hidden", screen !== next);
            });
            next.classList.add("screen-entering");
            setTimeout(() => next.classList.remove("screen-entering"), 500);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        active.classList.add("screen-leaving");

        setTimeout(() => {
            active.classList.add("screen-hidden");
            active.classList.remove("screen-leaving");

            next.classList.remove("screen-hidden");
            next.classList.add("screen-entering");

            window.scrollTo({ top: 0, behavior: "smooth" });

            setTimeout(() => next.classList.remove("screen-entering"), 500);
        }, 450);
    }

    function renderAdvice(need) {
        const professionAdvice = getAdviceForProfession(user.profession);
        const items = professionAdvice[need];

        $("adviceGreeting").textContent =
            `Hola, ${user.name}. Eres ${user.profession}.`;

        $("adviceTitle").textContent = {
            curriculum: "Cómo mejorar tu currículum",
            portfolio: "Cómo mejorar tu portafolio",
            interview: "Cómo prepararte para una entrevista"
        }[need];

        $("adviceDescription").textContent = {
            curriculum: "Consejos para presentar mejor tu experiencia.",
            portfolio: "Consejos para presentar mejor tus proyectos.",
            interview: "Consejos para explicar tu experiencia y destacar."
        }[need];

        $("adviceList").innerHTML = "";

        items.forEach(([title, text]) => {
            const article = document.createElement("article");
            article.className = "advice-item";

            const h3 = document.createElement("h3");
            h3.textContent = title;

            const p = document.createElement("p");
            p.textContent = text;

            article.appendChild(h3);
            article.appendChild(p);
            $("adviceList").appendChild(article);
        });

        $("createCvButton").classList.toggle("hidden", need !== "curriculum");
        $("createPortfolioButton").classList.toggle("hidden", need !== "portfolio");
    }

    function renderHelp(containerId, need) {
        const container = $(containerId);
        container.innerHTML = "";

        getAdviceForProfession(user.profession)[need].forEach(([title, text]) => {
            const item = document.createElement("div");
            item.className = "help-item";

            const strong = document.createElement("strong");
            strong.textContent = title;

            const p = document.createElement("p");
            p.textContent = text;

            item.appendChild(strong);
            item.appendChild(p);
            container.appendChild(item);
        });
    }

    /* Inicio */
    $("startButton").addEventListener("click", () => showScreen("register"));

    /* Registro */
    $("registerForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = $("userName").value.trim();
        const email = $("userEmail").value.trim();
        const phone = $("userPhone").value.trim();
        const profession = $("userProfession").value;

        if (!name || !email || !phone || !profession) {
            $("registerError").textContent =
                "Completa todos los campos para continuar.";
            return;
        }

        user = { name, email, phone, profession };
        localStorage.setItem("creativejob_user", JSON.stringify(user));
        $("registerError").textContent = "";

        showScreen("needs");
    });

    /* Necesidad */
    document.querySelectorAll(".need-card").forEach((button) => {
        button.addEventListener("click", () => {
            if (!user) {
                $("needsError").textContent =
                    "Primero completa el registro.";
                return;
            }

            currentNeed = button.dataset.need;
            renderAdvice(currentNeed);
            showScreen("advice");
        });
    });

    $("changeNeedButton").addEventListener("click", () => {
        showScreen("needs");
    });

    /* =========================
       CURRÍCULUM
    ========================= */

    $("createCvButton").addEventListener("click", () => {
        if (!user || currentNeed !== "curriculum") {
            return;
        }

        renderHelp("cvAdvice", "curriculum");

        $("cvFullName").value = user.name;
        $("cvJob").value = user.profession;
        $("cvContact").value = `${user.email} · ${user.phone}`;

        updateCvPreview();
        showScreen("cv");
    });

    $("backFromCvButton").addEventListener("click", () => {
        showScreen("advice");
    });

    $("cvPhoto").addEventListener("change", () => {
        const file = $("cvPhoto").files[0];

        if (!file) {
            cvPhotoData = "";
            $("cvPreviewPhoto").style.display = "none";
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Selecciona una imagen válida.");
            $("cvPhoto").value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            cvPhotoData = event.target.result;
            $("cvPreviewPhoto").src = cvPhotoData;
            $("cvPreviewPhoto").style.display = "block";
        };

        reader.readAsDataURL(file);
    });

    [
        "cvFullName",
        "cvJob",
        "cvContact",
        "cvProfile",
        "cvExperience",
        "cvEducation",
        "cvSkills"
    ].forEach((id) => {
        $(id).addEventListener("input", updateCvPreview);
    });

    function updateCvPreview() {
        $("cvPreviewName").textContent =
            $("cvFullName").value || "TU NOMBRE";

        $("cvPreviewJob").textContent =
            $("cvJob").value || "TU PROFESIÓN";

        $("cvPreviewProfile").textContent =
            $("cvProfile").value || "";

        $("cvPreviewExperience").textContent =
            $("cvExperience").value || "";

        $("cvPreviewEducation").textContent =
            $("cvEducation").value || "";

        $("cvPreviewSkills").textContent =
            $("cvSkills").value || "";

        $("cvPreviewContactSide").textContent =
            $("cvContact").value || "";
    }

    $("downloadCvButton").addEventListener("click", async () => {
        await downloadCvPdf();
    });

    async function downloadCvPdf() {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert("No se pudo cargar el generador de PDF. Revisa tu conexión a internet y vuelve a intentar.");
            return;
        }

        updateCvPreview();

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const margin = 12;
        const pageWidth = 210;
        const pageHeight = 297;
        const leftWidth = 60;
        const rightX = margin + leftWidth + 5;
        const rightWidth = pageWidth - rightX - margin;

        pdf.setFillColor(242, 242, 238);
        pdf.rect(margin, margin, leftWidth, pageHeight - margin * 2, "F");

        let yLeft = margin + 10;

        if (cvPhotoData) {
            try {
                pdf.addImage(
                    cvPhotoData,
                    "JPEG",
                    margin + 10,
                    yLeft,
                    40,
                    40
                );
                yLeft += 48;
            } catch (error) {
                // Continúa sin foto si el formato no se puede insertar.
            }
        }

        pdf.setTextColor(30, 30, 30);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);

        writePdfSection(
            pdf,
            "EDUCACIÓN",
            $("cvEducation").value,
            margin + 8,
            yLeft,
            leftWidth - 16
        );

        yLeft += 65;

        writePdfSection(
            pdf,
            "SKILLS",
            $("cvSkills").value,
            margin + 8,
            yLeft,
            leftWidth - 16
        );

        yLeft += 65;

        writePdfSection(
            pdf,
            "CONTACT",
            $("cvContact").value,
            margin + 8,
            yLeft,
            leftWidth - 16
        );

        pdf.setTextColor(25, 25, 25);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(24);
        pdf.text(
            $("cvFullName").value || "TU NOMBRE",
            rightX,
            margin + 18,
            { maxWidth: rightWidth }
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(11);
        pdf.setTextColor(80, 80, 80);
        pdf.text(
            ($("cvJob").value || "TU PROFESIÓN").toUpperCase(),
            rightX,
            margin + 27,
            { maxWidth: rightWidth }
        );

        let yRight = margin + 42;

        yRight = writePdfSection(
            pdf,
            "PERFIL",
            $("cvProfile").value,
            rightX,
            yRight,
            rightWidth
        );

        yRight += 8;

        writePdfSection(
            pdf,
            "EXPERIENCIA",
            $("cvExperience").value,
            rightX,
            yRight,
            rightWidth
        );

        pdf.save(
            `${safeFileName($("cvFullName").value || "curriculum")}.pdf`
        );
    }

    function writePdfSection(pdf, title, body, x, y, width) {
        pdf.setTextColor(30, 30, 30);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.text(title, x, y);

        pdf.setLineWidth(0.4);
        pdf.setDrawColor(80, 80, 80);
        pdf.line(x, y + 2, x + width, y + 2);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);

        const text = body || "";
        const lines = pdf.splitTextToSize(text, width);
        const lineHeight = 4.2;

        let cursor = y + 9;

        lines.forEach((line) => {
            if (cursor > 282) return;
            pdf.text(line, x, cursor);
            cursor += lineHeight;
        });

        return cursor;
    }

    function safeFileName(name) {
        return name
            .normalize("NFD")
            .replace(/[\\u0300-\\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_ ]/g, "")
            .trim()
            .replace(/\\s+/g, "-")
            .toLowerCase();
    }

    /* =========================
       PORTAFOLIO
    ========================= */

    $("createPortfolioButton").addEventListener("click", () => {
        if (!user || currentNeed !== "portfolio") {
            return;
        }

        renderHelp("portfolioAdvice", "portfolio");

        $("portfolioAuthor").value = user.name;
        $("portfolioProfession").value = user.profession;
        $("portfolioEmail").value = user.email;
        $("portfolioPhone").value = user.phone;

        showScreen("portfolio");
    });

    $("backFromPortfolioButton").addEventListener("click", () => {
        showScreen("advice");
    });

    $("addProjectButton").addEventListener("click", () => {
        const name = $("projectName").value.trim();

        if (!name) {
            alert("Escribe el nombre del proyecto.");
            return;
        }

        const files = Array.from($("projectImages").files || []);

        readImages(files).then((images) => {
            projects.push({
                name,
                description: $("projectDescription").value.trim(),
                role: $("projectRole").value.trim(),
                tools: $("projectTools").value.trim(),
                link: $("projectLink").value.trim(),
                images
            });

            renderPortfolioProjects();
            clearProjectForm();
        });
    });

    function readImages(files) {
        if (!files.length) return Promise.resolve([]);

        return Promise.all(
            files.map(
                (file) =>
                    new Promise((resolve, reject) => {
                        if (!file.type.startsWith("image/")) {
                            resolve(null);
                            return;
                        }

                        const reader = new FileReader();

                        reader.onload = (event) =>
                            resolve(event.target.result);

                        reader.onerror = () => reject(new Error("No se pudo leer la imagen."));

                        reader.readAsDataURL(file);
                    })
            )
        ).then((results) => results.filter(Boolean));
    }

    function renderPortfolioProjects() {
        const container = $("portfolioProjectsPreview");
        container.innerHTML = "";

        if (!projects.length) {
            container.innerHTML = "<p>No hay proyectos todavía.</p>";
            return;
        }

        projects.forEach((project, index) => {
            const card = document.createElement("article");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.name;
            card.appendChild(title);

            if (project.images.length) {
                const gallery = document.createElement("div");
                gallery.className = "project-gallery";

                project.images.forEach((image) => {
                    const img = document.createElement("img");
                    img.src = image;
                    img.alt = project.name;
                    gallery.appendChild(img);
                });

                card.appendChild(gallery);
            }

            if (project.description) {
                const p = document.createElement("p");
                p.textContent = project.description;
                card.appendChild(p);
            }

            if (project.role) {
                const p = document.createElement("p");
                p.innerHTML =
                    `<strong>¿Qué hiciste?</strong> ${escapeHtml(project.role)}`;
                card.appendChild(p);
            }

            if (project.tools) {
                const p = document.createElement("p");
                p.innerHTML =
                    `<strong>Herramientas:</strong> ${escapeHtml(project.tools)}`;
                card.appendChild(p);
            }

            if (project.link) {
                const a = document.createElement("a");
                a.href = project.link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = "Ver proyecto";
                card.appendChild(a);
            }

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-project";
            deleteButton.type = "button";
            deleteButton.textContent = "Eliminar proyecto";

            deleteButton.addEventListener("click", () => {
                projects.splice(index, 1);
                renderPortfolioProjects();
            });

            card.appendChild(deleteButton);
            container.appendChild(card);
        });
    }

    function clearProjectForm() {
        $("projectName").value = "";
        $("projectDescription").value = "";
        $("projectRole").value = "";
        $("projectTools").value = "";
        $("projectImages").value = "";
        $("projectLink").value = "";
    }

    $("downloadPortfolioButton").addEventListener("click", async () => {
        await downloadPortfolioPdf();
    });

    async function downloadPortfolioPdf() {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            alert("No se pudo cargar el generador de PDF. Revisa tu conexión a internet y vuelve a intentar.");
            return;
        }

        if (!projects.length) {
            alert("Agrega al menos un proyecto antes de descargar el portafolio.");
            return;
        }

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // PORTADA
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.text("PORTAFOLIO", 20, 30);

        pdf.setFontSize(26);
        pdf.text(
            $("portfolioTitle").value || "Mi portafolio",
            20,
            48,
            { maxWidth: 170 }
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(13);

        let coverY = 62;

        [
            ["Autor", $("portfolioAuthor").value || "—"],
            ["Profesión", $("portfolioProfession").value || "—"],
            ["Correo", $("portfolioEmail").value || "—"],
            ["Teléfono", $("portfolioPhone").value || "—"],
            ["Ciudad", $("portfolioLocation").value || "—"]
        ].forEach(([label, value]) => {
            pdf.setFont("helvetica", "bold");
            pdf.text(`${label}:`, 20, coverY);
            pdf.setFont("helvetica", "normal");
            pdf.text(String(value), 52, coverY, { maxWidth: 135 });
            coverY += 8;
        });

        pdf.setFont("helvetica", "bold");
        pdf.text("Presentación", 20, coverY + 8);

        pdf.setFont("helvetica", "normal");
        const bioLines = pdf.splitTextToSize(
            $("portfolioBio").value || "",
            165
        );

        pdf.text(
            bioLines.length ? bioLines : ["—"],
            20,
            coverY + 18
        );

        // PROYECTOS
        for (let projectIndex = 0; projectIndex < projects.length; projectIndex += 1) {
            const project = projects[projectIndex];

            pdf.addPage();

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(20);
            pdf.text(
                `${projectIndex + 1}. ${project.name}`,
                20,
                28,
                { maxWidth: 170 }
            );

            let y = 40;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);

            if (project.description) {
                const lines = pdf.splitTextToSize(
                    project.description,
                    170
                );

                pdf.text(lines, 20, y);
                y += Math.max(12, lines.length * 4.5 + 5);
            }

            const meta = [];
            if (project.role) meta.push(`¿Qué hiciste?: ${project.role}`);
            if (project.tools) meta.push(`Herramientas: ${project.tools}`);

            if (meta.length) {
                pdf.setFontSize(9);
                pdf.text(
                    pdf.splitTextToSize(meta.join(" · "), 170),
                    20,
                    y
                );
                y += 12;
            }

            const images = project.images || [];

            if (!images.length) {
                if (project.link) {
                    pdf.setFontSize(9);
                    pdf.text(
                        `Enlace: ${project.link}`,
                        20,
                        Math.min(y + 10, 280),
                        { maxWidth: 170 }
                    );
                }
                continue;
            }

            for (let imageIndex = 0; imageIndex < images.length; imageIndex += 1) {
                if (imageIndex > 0) {
                    pdf.addPage();
                    y = 22;

                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(14);
                    pdf.text(
                        `${project.name} — continuación`,
                        20,
                        y
                    );

                    y += 12;
                }

                const imageWidth = 78;
                const imageHeight = 72;
                const column = imageIndex % 2;
                const row = Math.floor((imageIndex % 4) / 2);

                const x = 20 + column * 88;
                const imageY = y + row * 82;

                try {
                    pdf.addImage(
                        images[imageIndex],
                        "JPEG",
                        x,
                        imageY,
                        imageWidth,
                        imageHeight,
                        undefined,
                        "FAST"
                    );

                    pdf.setFontSize(8);
                    pdf.setFont("helvetica", "normal");
                    pdf.text(
                        `Imagen ${imageIndex + 1}`,
                        x,
                        imageY + imageHeight + 5
                    );
                } catch (error) {
                    // Si una imagen falla, el resto del PDF se sigue generando.
                }

                if (imageIndex % 4 === 3 && imageIndex < images.length - 1) {
                    pdf.addPage();
                    y = 22;

                    pdf.setFont("helvetica", "bold");
                    pdf.setFontSize(14);
                    pdf.text(
                        `${project.name} — continuación`,
                        20,
                        y
                    );

                    y += 12;
                }
            }

            if (project.link) {
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(8);
                pdf.text(
                    `Enlace: ${project.link}`,
                    20,
                    285,
                    { maxWidth: 170 }
                );
            }
        }

        pdf.save(
            `${safeFileName(
                $("portfolioTitle").value || "portafolio"
            )}.pdf`
        );
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function safeFileName(name) {
        return name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9-_ ]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();
    }

    /* Recuperar usuario */
    const saved = localStorage.getItem("creativejob_user");

    if (saved) {
        try {
            user = JSON.parse(saved);

            $("userName").value = user.name || "";
            $("userEmail").value = user.email || "";
            $("userPhone").value = user.phone || "";
            $("userProfession").value = user.profession || "";
        } catch {
            localStorage.removeItem("creativejob_user");
            user = null;
        }
    }

    $("cvPreviewPhoto").style.display = "none";
    renderPortfolioProjects();
})();
