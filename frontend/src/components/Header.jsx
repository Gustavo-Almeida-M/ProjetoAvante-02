import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { Link, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            CRUD
                        </a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a href="/" className="nav-link active">
                                        Home
                                    </a>
                                </li>
                                {/* INÍCIO DO DROPDOWN*/}
                                <li className="nav-item dropdown">
                                    <a
                                        href="http://www.bootstrap.com/"
                                        className="nav-link dropdown-toggle"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Aluno
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/listar">
                                                Listar Aluno
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/criar">
                                                Criar Aluno
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/editar">
                                                Editar Aluno
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/cursos">
                                                Alunos por Curso
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/acimamedia">
                                                Alunos acima da média
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/abaixomedia">
                                                Alunos abaixo da média
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet />

            </div>
        </>
    );
}

export default Header;