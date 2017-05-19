package br.com.api.util;

import javax.persistence.EntityManager;

import br.com.api.model.Cliente;

public class PopulaBanco {

	public static void main(String[] args) {

		Cliente cliente = new Cliente("Fabio", "fabio.pouza@7comm.com.br", "07704100");
		Cliente cliente2 = new Cliente("Lucas", "lucas.fernandes@7comm.com.br", "05763410");
		Cliente cliente3 = new Cliente("Jimmy", "jimmy.leung@7comm.com.br", "12345678");

		EntityManager em = new JpaUtil().getEntityManager();
		em.getTransaction().begin();
		em.persist(cliente);
		em.persist(cliente2);
		em.persist(cliente3);

		em.getTransaction().commit();
		em.close();

	}
}
