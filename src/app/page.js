"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import p5 from "p5";
import "./globals.css";

export default function Home() {
  const [showDibujo, setShowDibujo] = useState(false);

  useEffect(() => {
    // Fondo de estrellas
    const estrellasSketch = (p) => {
      let estrellas = [];
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(30);
        for (let i = 0; i < 100; i++) {
          estrellas.push(new Estrella(p));
        }
      };

      p.draw = () => {
        p.clear();
        p.background(10, 10, 30, 150); // Fondo oscuro con transparencia
        for (let estrella of estrellas) {
          estrella.mover();
          estrella.mostrar();
        }
      };

      class Estrella {
        constructor(p) {
          this.p = p;
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.velocidad = p.random(3, 7);
          this.tamano = p.random(1, 4);
          this.longitud = p.random(20, 50);
        }

        mover() {
          this.x -= this.velocidad;
          this.y += this.velocidad / 2;
          if (this.x < 0 || this.y > this.p.height) {
            this.x = this.p.random(this.p.width, this.p.width + 200);
            this.y = this.p.random(-200, this.p.height / 2);
          }
        }

        mostrar() {
          this.p.stroke(255);
          this.p.strokeWeight(this.tamano);
          this.p.line(this.x, this.y, this.x + this.longitud, this.y - this.longitud / 2);
        }
      }
    };

    // Crear el fondo de estrellas
    const estrellasContainer = document.getElementById("fondo-estrellas");
    if (estrellasContainer) {
      const myP5 = new p5(estrellasSketch, estrellasContainer);
      return () => myP5.remove(); // Limpiar cuando el componente se desmonte
    }
  }, []);

  useEffect(() => {
    // Dibujo de la jirafa
    if (!showDibujo) return;

    const sketch = (p) => {
      let step = 0; // Controla el orden del dibujo

      p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0, 0); // Fondo transparente
        p.frameRate(2); // Velocidad de dibujo
      };

      p.draw = () => {
        const drawCircle = (x, y, radius, color) => {
          p.fill(color);
          p.noStroke();
          p.ellipse(x, y, radius * 2);
        };

        const drawRect = (x, y, width, height, color) => {
          p.fill(color);
          p.noStroke();
          p.rect(x, y, width, height);
        };

        p.fill("black");
        p.textSize(16);
        p.textAlign(p.CENTER);

        switch (step) {
          case 0:
            drawRect(150, 150, 100, 150, "orange"); // Cuerpo
            break;
          case 1:
            drawRect(180, 100, 40, 50, "orange"); // Cuello
            break;
          case 2:
            drawCircle(200, 80, 40, "orange"); // Cabeza
            break;
          case 3:
            drawRect(160, 50, 20, 20, "orange"); // Oreja izquierda
            drawRect(220, 50, 20, 20, "orange"); // Oreja derecha
            break;
          case 4:
            drawRect(170, 30, 10, 20, "brown"); // Cuerno izquierdo
            drawRect(220, 30, 10, 20, "brown"); // Cuerno derecho
            break;
          case 5:
            drawRect(155, 300, 20, 50, "orange"); // Pata izquierda
            drawRect(225, 300, 20, 50, "orange"); // Pata derecha
            break;
          case 6:
            drawCircle(170, 200, 20, "brown"); // Manchas
            drawCircle(230, 230, 15, "brown");
            drawCircle(180, 250, 15, "brown");
            drawCircle(190, 110, 10, "brown");
            drawCircle(210, 130, 10, "brown");
            break;
          case 7:
            drawCircle(190, 70, 5, "black"); // Ojos
            drawCircle(210, 70, 5, "black");
            break;
          case 8:
            drawCircle(190, 90, 3, "black"); // Nariz
            drawCircle(210, 90, 3, "black");
            break;
          case 9:
            p.stroke("black");
            p.strokeWeight(2);
            p.noFill();
            p.arc(270, 250, 30, 30, p.PI / 3, p.PI); // Cola
            break;
          case 10:
            p.noStroke();
            p.fill("black");
            p.textSize(24);
            p.textAlign(p.CENTER);
            p.text("Buenas Noches", 200, 380); // Texto final
            p.noLoop(); // Detiene el dibujo al terminar
            break;
        }

        step++;
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove(); // Limpiar cuando el componente se desmonte
  }, [showDibujo]);

  return (
    <main className="page-container">
      <div id="fondo-estrellas" className="background-stars"></div>

      {!showDibujo && (
        <>
          {/* Botón en el centro */}
          <motion.button
            className="glowing-button"
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => setShowDibujo(true)}
          >
            Ver Dibujo
          </motion.button>
        </>
      )}

      {showDibujo && (
        <>
          <div id="p5-container"></div> {/* El lienzo de p5.js para la jirafa se renderiza aquí */}
          <motion.button
            className="glowing-button2"
            onClick={() => window.location.reload()} // Recarga la página
          >
            Salir
          </motion.button>
        </>
      )}
    </main>
  );
}
