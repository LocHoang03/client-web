import {
  DivContact,
  DivBanner,
  BannerContact,
  DivContent,
  Text,
  Title,
  Content,
} from './styles';
import image from '../../assets/images/term_and_condition.jpg';
import { Helmet } from 'react-helmet-async';

function TermAndConditionPage() {
  return (
    <DivContact>
      <Helmet>
        <title>Term And Condition</title>
        <link rel="canonical" href={process.env.REACT_APP_PUBLIC_HOST} />
      </Helmet>
      <DivBanner>
        <BannerContact src={image} />
      </DivBanner>
      <Content>
        <DivContent>
          <Text>
            Please read this page carefully as it sets out the terms that apply
            to your use of the Website, and any part of their content and all
            materials appearing on them. By using the Website you confirm that
            you accept these Terms of Use and you agree to comply with them. If
            you do not agree to these Terms of Use, please refrain from using
            the Website.
          </Text>
          <Title>YOUR USE OF THE WEBSITE IF YOU ARE UNDER 18</Title>
          <Text>
            If you are under 18, you may need your parent/guardian to help you
            with your use of the Website and with reading these Terms and
            Conditions. If anything is hard to understand, please ask you
            parent/guardian to explain. If you still have any questions, you or
            your parent/guardian can contact us at: [
            <a href="mailto:hoangphuocloc.phurieng@gmail.com">
              hoangphuocloc.phurieng@gmail.com
            </a>
            ].
          </Text>
          <Text>
            If you are aged 13 or under, you cannot register for a ShowHub
            account (“Account”) without the permission of your parent/guardian.
            You need to register if you want to play the Fantasy game. You do
            not need to register to use the Website.
          </Text>
          <Text>
            We may collect your personal information when you use the Website
            and the App. You can find out more about how we use your personal
            information in our Questions and Answers.
          </Text>
          <Title>OTHER APPLICABLE TERMS</Title>
          <Text>
            These Terms of Use are additional to, and should be read in
            conjunction with, our Privacy Policy and Cookie Policy.
          </Text>
          <Text>
            If you are under 18, we have tried to explain these policies for you
            in our Questions and Answers. You can find a link here:{' '}
            <a href="/contact">link</a>.
          </Text>
          <Title>CHANGES TO THESE TERMS OF USE</Title>
          <Text>
            We may change these terms at any time by amending this page. Please
            check this page regularly to take notice of any such changes as you
            will be deemed to accept them through your continued use of the
            Website.
          </Text>
          <Title>CHANGES TO THE WEBSITE</Title>
          <Text>
            We aim to update the Website regularly, and may change the content
            at any time. If the need arises, we may suspend access to the
            Website, or close it indefinitely. We will not be liable if for any
            reason the Website is unavailable at any time or for any period. Any
            of the material on the Website may be out of date at any given time,
            and we are under no obligation to update such material.
          </Text>
          <Title>ACCOUNT</Title>
          <Text>
            You may register for an Account. You are not permitted to register
            multiple Accounts on the Website.
          </Text>
          <Text>
            In registering for an Account, you will be providing personal data
            to the ShowHub. Any personal data which you do submit will be
            processed in accordance with the ShowHub’s Privacy Policy and in
            accordance with relevant data protection legislation including the
            General Data Protection Regulation (“GDPR”) and the Data Protection
            Act 2018. If you are under 18, you can find out more about how we
            use your personal information in our Questions and Answers, which is
            available here: <a href="/contact">link</a>.
          </Text>
          <Title>EXTERNAL LINKS</Title>
          <Text>
            The Website contains links to other websites and services operated
            by parties independent to the us. We take reasonable precautions in
            selecting these however we do not endorse or take responsibility for
            the content or availability of these websites and cannot accept any
            liability for any material contained within them or for your use of
            them or any use of your personal data collected by their operators.
            If you decide to access linked websites you do so at your own risk
            and we encourage you to read the privacy statements applicable to
            each specific website.
          </Text>
          <Text>
            If you are under 18, you may need your parent/guardian to help you
            with your use of the Website and with ensuring the content and
            availability of any linked websites and services are appropriate.
          </Text>
          <Title>VIRUSES</Title>
          <Text>
            We and our suppliers take reasonable precautions to prevent computer
            viruses, trojan horses, worms, time bombs, cancelbots, corrupted
            files, or any other items that may damage the operation of computers
            or property or otherwise engage in computer misuse ("Malicious
            Programmes") on the Website but cannot accept any liability for
            them. You are advised to take precautions against such Malicious
            Programmes, including the use of suitable protective software.
          </Text>
          <Title>YOUR LAWFUL USE OF THE WEBSITE</Title>
          <Text>
            You must not misuse the Website by knowingly introducing Malicious
            Programmes. You must not attempt to gain unauthorised access to the
            Website, the server on which the Website is stored or any server,
            computer or database connected to the Website. You must not attack
            the Website via a denial-of-service attack or a distributed
            denial-of-service attack. By breaching this provision, you would
            commit a criminal offence under the Computer Misuse Act 1990. We
            will report any such breach to the relevant law enforcement
            authorities and will co-operate with those authorities by disclosing
            your identity to them. In the event of such a breach, your right to
            use the Website will cease immediately.
          </Text>
          <Title>LIMITATION OF LIABILITY</Title>
          <Text>
            Except in the case of death or personal injury caused by our
            negligence or any wilful act, to the fullest extent permitted by law
            we exclude all liability to you in respect of your Account and your
            use of the Website.
          </Text>
          <Title>GOVERNING LAW</Title>
          <Text>
            These Terms of Use are governed by and interpreted in accordance
            with the laws of England and Wales. Any disputes arising under or in
            connection with these terms shall be subject to the non-exclusive
            jurisdiction of the English courts.
          </Text>
          <Title>CONTACT</Title>
          <Text>
            If you have any comments or questions about the Website or the App
            please contact us at{' '}
            <a href="mailto:hoangphuocloc.phurieng@gmail.com">
              hoangphuocloc.phurieng@gmail.com
            </a>
          </Text>
        </DivContent>
      </Content>
    </DivContact>
  );
}

export default TermAndConditionPage;
