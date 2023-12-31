import { MdStars } from "react-icons/md";
import {
  SiAdidas,
  SiNewbalance,
  SiNike,
  SiPuma,
  SiReebok,
  SiUnderarmour,
} from "react-icons/si";

function truncarTexto(texto) {
  const palabras = texto.split(" ");

  if (palabras.length > 20) {
    const truncado = palabras.slice(0, 20).join(" ") + "...";
    return truncado;
  }

  return texto;
}
const scrollToElement = (idElement) => {
  const elemento = document.getElementById(idElement);
  if (elemento) {
    elemento.scrollIntoView({ behavior: "smooth" });
  }
};

const listaIconos = [
  { marca: "Vans", links: "", num: 0 },
  { marca: "Reebok", links: <SiReebok className="w-auto h-auto" />, num: 0 },
  { marca: "Adidas", links: <SiAdidas className="w-auto h-auto" />, num: 0 },
  { marca: "Nike", links: <SiNike className="w-auto h-auto" />, num: 0 },
  { marca: "Puma", links: <SiPuma className="w-auto h-auto" />, num: 0 },
  {
    marca: "Under Armour",
    links: <SiUnderarmour className="w-auto h-auto" />,
    num: 0,
  },
  {
    marca: "New Balance",
    links: <SiNewbalance className="w-auto h-auto" />,
    num: 0,
  },
  { marca: "Converse", links: <MdStars className="w-auto h-auto" />, num: 0 },
];

export { truncarTexto, scrollToElement, listaIconos };
