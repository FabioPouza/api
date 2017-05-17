package br.com.api.dao;

import javax.persistence.EntityManager;

import br.com.api.model.Cliente;
import br.com.api.util.JpaUtil;

public class CadastrarCliente {
	
	public void salvar(Cliente cliente) {

		EntityManager em = new JpaUtil().getEntityManager();
		em.getTransaction().begin();
		em.persist(cliente);
		em.getTransaction().commit();
		em.close();

	}

}
