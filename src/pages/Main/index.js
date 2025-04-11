import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeletButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa"

import api from "../../services/api";

export default function Main() {

  const [newRepo, setNewRepo] = useState('')
  const [repositorios, setRepositorios] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  // DidMout Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage))
    }
  }, []);

  // DidUpdate salvar alteraçoes
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios))
  }, [repositorios]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null)
  }

  // ////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true)
      setAlert(null)
      try {

        if (newRepo === '') {
          throw new Error("Voçe precisa indicar um repositorio")
        }

        const response = await api.get(`repos/${newRepo}`);
        const hasRepo = repositorios.find(repo => repo.name === newRepo)

        if (hasRepo) {
          throw new Error("repositorio duplicado")
        }

        const data = {
          name: response.data.full_name,
        }
        setRepositorios([...repositorios, data]);
        setNewRepo("");

      } catch (error) {
        setAlert(true)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    submit();
  }, [newRepo, repositorios]);
  // ////////////////////////////////////////////////////////////////////////////////////

  const handleDelet = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find)
  }, [repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} errors={alert}>
        <input
          type="text"
          placeholder="Adicionar Repositorio "
          value={newRepo}
          onChange={handleinputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>

          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}

        </SubmitButton>
      </Form>

      <List>
        {
          repositorios.map(repo => (

            <li key={repo.name}>
              <span>

                <DeletButton onClick={() => handleDelet(repo.name)}>
                  <FaTrash size={14} />
                </DeletButton>

                {repo.name}</span>
              <a href="###">
                <FaBars size={20} />
              </a>
            </li>
          ))
        }

      </List>
    </Container>
  );
}


