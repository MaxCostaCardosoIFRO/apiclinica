'use client'
import React, { useState, useEffect } from "react";
const urlPadrao = "http://localhost:3000/medicos";

export default function medicos() {
    const [medicos, setMedicos] = useState([]);
    const [medicosPorNome, setMedicosPorNome] = useState([]);

    async function apresetarTodosMedicos() {
        try {
            const response = await fetch(urlPadrao)
            if (!response.ok) {
                throw new Error("Erro ao buscar dados:" + response.statusText);

            }
            const data = await response.json();
            setMedicos(data);

        } catch (error) {
            console.log('Ocorreu algum erro:' + error)
        }
    }

    async function pesquisarMedicoPorNome(nome) {
        try {
            const response = await fetch(`${urlPadrao}?nome=${nome}`)
            if (!response.ok) {
                throw new Error("Erro ao buscar dados:" + response.statusText);

            }
            const data = await response.json();
            setMedicosPorNome(data);

        } catch (error) {
            console.log('Ocorreu algum erro:' + error)
        }
    }

    useEffect(() => {
        apresetarTodosMedicos();
    }, [])

    return (
        <div>
            <div>
                <ul>
                    <input type="text" onChange={(e) => pesquisarMedicoPorNome(e.target.value)} />
                    {medicosPorNome.map((medico) => (
                        <li key={medico.id}>{medico.nome}</li>
                    ))}
                </ul>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>Especialidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos.map((medico) => (
                            <tr key={medico.id}>
                                <td>{medico.id}</td>
                                <td>{medico.nome}</td>
                                <td>{medico.telefone}</td>
                                <td>{medico.email}</td>
                                <td>{medico.especialidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}