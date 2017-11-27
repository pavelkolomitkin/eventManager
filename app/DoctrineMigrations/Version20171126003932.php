<?php declare(strict_types = 1);

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171126003932 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE event_status (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(20) NOT NULL, title VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_4999124E77153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE event_priority (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, value INT NOT NULL, code VARCHAR(20) NOT NULL, UNIQUE INDEX UNIQ_244A35F71D775834 (value), UNIQUE INDEX UNIQ_244A35F777153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE event ADD status_id INT NOT NULL, ADD priority_id INT NOT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA76BF700BD FOREIGN KEY (status_id) REFERENCES event_status (id)');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7497B19F9 FOREIGN KEY (priority_id) REFERENCES event_priority (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA76BF700BD ON event (status_id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7497B19F9 ON event (priority_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA76BF700BD');
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7497B19F9');
        $this->addSql('DROP TABLE event_status');
        $this->addSql('DROP TABLE event_priority');
        $this->addSql('DROP INDEX IDX_3BAE0AA76BF700BD ON event');
        $this->addSql('DROP INDEX IDX_3BAE0AA7497B19F9 ON event');
        $this->addSql('ALTER TABLE event DROP status_id, DROP priority_id');
    }
}
