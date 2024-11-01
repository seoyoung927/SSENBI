package com.haneolenae.bobi.domain.member.repository;

import com.haneolenae.bobi.domain.member.entity.Member;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByMemberId(String memberId);

	Optional<Member> findById(Long id);
}
