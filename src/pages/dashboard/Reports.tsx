import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Search, 
  Mail,
  Calendar,
  CheckCircle,
  Download,
  Filter
} from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const communicationData = [
    { timestamp: '8/6/2025, 5:54:54 PM', recipient: 'sfisongobese530@gmail.com', subject: 'Quotation #2020752726 – Valid Until 8/13/2025', status: 'Sent' },
    { timestamp: '8/5/2025, 4:22:27 AM', recipient: 'info@globalbusinessolutions.co.za', subject: 'Quotation #[2020752725] – Valid Until 8/12/2025', status: 'Sent' },
    { timestamp: '7/31/2025, 1:38:37 PM', recipient: 'muneiyowgaty@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:37:41 PM', recipient: 'banzizulu@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:37:22 PM', recipient: 'motla.ramapulane@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:35:48 PM', recipient: 'mabiletsathabang@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:28:06 PM', recipient: 'chiloaneoscar16@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:20:35 PM', recipient: 'mvelasenkonzo@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:19:54 PM', recipient: 'info@globalbusinessolutions.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:19:00 PM', recipient: 'songo.m@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/31/2025, 1:08:57 PM', recipient: 'NONDUMISAS@GMAIL.COM', subject: 'Quotation 2020752722 – Valid Until 8/7/2025', status: 'Sent' },
    { timestamp: '7/26/2025, 7:34:52 AM', recipient: 'info@globalbusinessolutions.co.za', subject: 'Quotation 2020752717 – Valid Until 8/07/2025', status: 'Sent' },
    { timestamp: '7/24/2025, 4:31:57 AM', recipient: 'bongiwepatience93@gmail.com', subject: 'Quotation #2020752715  – Valid Until 7/31/2025', status: 'Sent' },
    { timestamp: '7/23/2025, 9:26:20 PM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '7/23/2025, 5:08:52 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Quotation #[2020752712 – Valid Until 7/30/2025', status: 'Sent' },
    { timestamp: '7/23/2025, 4:54:28 AM', recipient: 'pumlanimzaku@gmail.com', subject: 'Quotation #[2020752711] – Valid Until 7/30/2025', status: 'Sent' },
    { timestamp: '7/20/2025, 10:45:31 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:45:13 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:44:58 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:44:42 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:44:31 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:44:05 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:43:54 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:43:42 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:43:28 PM', recipient: 'mj@danlaw.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:42:48 PM', recipient: 'muneiyowgaty@gmail.com', subject: ' Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:42:11 PM', recipient: 'banzizulu@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:41:46 PM', recipient: 'motla.ramapulane@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:40:34 PM', recipient: 'mashinini.thabile723@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:39:45 PM', recipient: 'seriteled04@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:39:10 PM', recipient: 'refithileagency@yahoo.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:38:40 PM', recipient: 'prettysmithhope@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:38:04 PM', recipient: 'NONDUMISAS@GMAIL.COM', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:37:42 PM', recipient: 'medorthprosth@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:37:06 PM', recipient: 'masekoluyanda3@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:36:31 PM', recipient: 'mabiletsathabang@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:36:10 PM', recipient: 'chiloaneoscar16@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:35:45 PM', recipient: 'mvelasenkonzo@gmail.com', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:35:18 PM', recipient: 'info@globalbusinessolutions.co.za', subject: '📄 Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/20/2025, 10:34:43 PM', recipient: 'songo.m@gmail.com', subject: 'Monthly Statement & Payment Reminder from Ij Langa Consulting (FSP 14279)', status: 'Sent' },
    { timestamp: '7/5/2025, 1:18:46 PM', recipient: 'medorthprosth@gmail.com', subject: 'Quotation 2020752700 – Valid Until 7/3/2025', status: 'Sent' },
    { timestamp: '7/3/2025, 9:49:28 AM', recipient: 'ProcurementHO15@sanral.co.za', subject: 'Quotation RFQ NO: SANRAL HO RFQ 150001282 – Valid Until [10/1/2025', status: 'Sent' },
    { timestamp: '7/1/2025, 6:45:17 AM', recipient: 'h.gmvelase@gmail.com', subject: 'Quotation 2020752706 – Valid Until 7/8/2025', status: 'Sent' },
    { timestamp: '7/1/2025, 6:44:56 AM', recipient: 'h.gmvelase@gmail.com', subject: 'Quotation 2020752706 – Valid Until 7/8/2025', status: 'Sent' },
    { timestamp: '6/29/2025, 7:39:35 PM', recipient: 'muneiyowgaty@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:38:21 PM', recipient: 'motla.ramapulane@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:37:57 PM', recipient: 'seriteled04@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:37:20 PM', recipient: 'refithileagency@yahoo.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:36:52 PM', recipient: 'prettysmithhope@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:30:23 PM', recipient: 'masekoluyanda3@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:27:44 PM', recipient: 'mabiletsathabang@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:26:46 PM', recipient: 'chiloaneoscar16@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:25:36 PM', recipient: 'mvelasenkonzo@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:24:13 PM', recipient: 'info@globalbusinessolutions.co.za', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/29/2025, 7:23:07 PM', recipient: 'songo.m@gmail.com', subject: '📢 **Subject:** Your Monthly Statement, Terms Update & Important Notice', status: 'Sent' },
    { timestamp: '6/27/2025, 9:39:36 PM', recipient: 'medorthprosth@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '6/27/2025, 10:25:05 AM', recipient: 'h.gmvelase@gmail.com', subject: 'Quotation 2020752704 – Valid Until 7/4/2025', status: 'Sent' },
    { timestamp: '6/26/2025, 9:13:45 AM', recipient: 'medorthprosth@gmail.com', subject: 'Quotation 2020752702 – Valid Until 7/3/2025', status: 'Sent' },
    { timestamp: '6/19/2025, 12:44:12 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'mj@danlaw.co.za', status: 'Sent' },
    { timestamp: '6/14/2025, 4:50:18 PM', recipient: 'songo.m@gmail.com', subject: 'Quotation 2020752698 – Valid Until 6/28/2025', status: 'Sent' },
    { timestamp: '6/14/2025, 8:53:18 AM', recipient: 'songo.m@gmail.com', subject: 'Quotation 2020752698 – Valid Until 6/28/2025', status: 'Sent' },
    { timestamp: '6/11/2025, 5:05:58 PM', recipient: 'info@globalbusinessolutions.co.za', subject: 'RE: QUOTATION FOR FACILITATION OF SARS EXTENSION REQUEST (ISAAC KHOTA ENTREPRENEURS - 2018/294301/07)', status: 'Sent' },
    { timestamp: '6/11/2025, 10:41:06 AM', recipient: 'muneiyowgaty@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/11/2025, 10:39:54 AM', recipient: 'motla.ramapulane@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/11/2025, 10:39:52 AM', recipient: 'motla.ramapulane@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/11/2025, 10:39:17 AM', recipient: 'seriteled04@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/11/2025, 10:38:20 AM', recipient: 'refithileagency@yahoo.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/11/2025, 10:37:28 AM', recipient: 'mvelasenkonzo@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:43:28 PM', recipient: 'muneiyowgaty@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:43:12 PM', recipient: 'mkhulu6@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:42:51 PM', recipient: 'VSAKHILE27@GMAIL.COM', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:42:35 PM', recipient: 'infor@svklaw.co.za', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:42:19 PM', recipient: 'motla.ramapulane@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:42:04 PM', recipient: 'nkwele3@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:41:48 PM', recipient: 'seriteled04@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:41:25 PM', recipient: 'siphalipty1@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:41:07 PM', recipient: 'Zamamkhize992@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:40:44 PM', recipient: 'refithileagency@yahoo.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:40:43 PM', recipient: 'refithileagency@yahoo.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:40:24 PM', recipient: 'prettysmithhope@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:40:04 PM', recipient: 'siphalipty1@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:39:39 PM', recipient: 'ntandosetrading@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:39:15 PM', recipient: 'NONDUMISAS@GMAIL.COM', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:38:53 PM', recipient: 'masekoluyanda3@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:38:30 PM', recipient: 'ritohlu@awesome-events.co.za', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:38:11 PM', recipient: 'mabiletsathabang@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:37:52 PM', recipient: 'chiloaneoscar16@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:37:23 PM', recipient: 'mvelasenkonzo@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:37:06 PM', recipient: 'info@globalbusinessolutions.co.za', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:36:34 PM', recipient: 'kgotsoinnocent77@gmai.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:36:09 PM', recipient: 'Mkhizeayanda92@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:35:36 PM', recipient: 'songo.m@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '6/1/2025, 11:35:11 PM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '5/29/2025, 10:00:33 AM', recipient: 'banzizulu@gmail.com', subject: 'Quotation 2020752693 – Valid Until 6/5/2025', status: 'Sent' },
    { timestamp: '5/28/2025, 9:59:16 PM', recipient: 'seriteled04@gmail.com', subject: 'Invoice 20202591 – Due 6/4/2025', status: 'Sent' },
    { timestamp: '5/28/2025, 9:54:04 PM', recipient: 'seriteled04@gmail.com', subject: 'Quotation 2020752692 – Valid Until 6/4/2025', status: 'Sent' },
    { timestamp: '5/22/2025, 1:38:38 AM', recipient: 'mj@danlaw.co.za', subject: 'Customer', status: 'Sent' },
    { timestamp: '5/21/2025, 8:53:38 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:52:55 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:52:36 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:52:12 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:51:51 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:51:32 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:51:07 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:50:40 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:50:06 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:49:45 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:49:27 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/21/2025, 8:48:38 PM', recipient: 'mj@danlaw.co.za', subject: 'Handover for collection', status: 'Sent' },
    { timestamp: '5/20/2025, 8:13:07 PM', recipient: 'info@globalbusinessolutions.co.za', subject: 'Invoice #20202590 – Due 5/19/2025', status: 'Sent' },
    { timestamp: '5/20/2025, 7:50:39 PM', recipient: 'info@globalbusinessolutions.co.za', subject: 'Quotation 38012033 – Valid Until 5/27/2025', status: 'Sent' },
    { timestamp: '5/20/2025, 7:24:30 PM', recipient: 'info@globalbusinessolutions.co.za', subject: 'Quotation #38012032] – Valid Until 5/27/2025', status: 'Sent' },
    { timestamp: '3/25/2025, 1:41:44 PM', recipient: 'motla.ramapulane@gmail.com', subject: 'Invoice 20202588 – Due 4/1/2025', status: 'Sent' },
    { timestamp: '3/24/2025, 3:15:29 PM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Quotation 38012030 – Valid Until 3/31/2025', status: 'Sent' },
    { timestamp: '3/24/2025, 12:09:33 PM', recipient: 'motla.ramapulane@gmail.com', subject: 'Quotation 38012028 – Valid Until 3/31/2025', status: 'Sent' },
    { timestamp: '3/11/2025, 5:23:11 PM', recipient: 'infor@svklaw.co.za', subject: 'Invoice 20202587 – 3/18/2025', status: 'Sent' },
    { timestamp: '3/3/2025, 6:25:10 AM', recipient: 'VSAKHILE27@GMAIL.COM', subject: 'Quotation 221 – Valid Until 3/10/2025', status: 'Sent' },
    { timestamp: '3/2/2025, 3:45:07 PM', recipient: 'NFSIKHANDZISA@GMAIL.COM', subject: 'Invoice 20202582 – Due 3/7/2025', status: 'Sent' },
    { timestamp: '3/2/2025, 3:43:34 PM', recipient: 'VSAKHILE27@GMAIL.COM', subject: 'Invoice 20202582 – Due 3/7/2025', status: 'Sent' },
    { timestamp: '3/2/2025, 3:37:58 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '3/2/2025, 12:51:31 PM', recipient: 'siphalipty1@gmail.com', subject: 'Quotation 218 – Valid Until 3/9/2025', status: 'Sent' },
    { timestamp: '2/28/2025, 1:59:50 PM', recipient: 'VSAKHILE27@GMAIL.COM', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '2/28/2025, 1:58:18 PM', recipient: 'ntandosetrading@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '2/27/2025, 5:02:45 AM', recipient: 'VSAKHILE27@GMAIL.COM', subject: 'Quotation 185 – Valid Until 12/10/2024', status: 'Sent' },
    { timestamp: '2/24/2025, 4:47:09 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '2/24/2025, 12:46:10 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Quotation 217 – Valid Until 3/3/2025', status: 'Sent' },
    { timestamp: '2/24/2025, 12:31:48 PM', recipient: 'Justicemothelesi0@gmail.com', subject: 'Quotation 216 – Valid Until 3/3/2025', status: 'Sent' },
    { timestamp: '2/24/2025, 12:22:08 PM', recipient: 'Justicemothelesi0@gmail.com', subject: 'Quotation 215 – Valid Until 3/3/2025', status: 'Sent' },
    { timestamp: '2/24/2025, 8:43:00 AM', recipient: 'musawenkosicm@gmail.com', subject: 'Quotation 214 – Valid Until 3/3/2025', status: 'Sent' },
    { timestamp: '2/24/2025, 3:07:26 AM', recipient: 'muneiyowgaty@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:07:11 AM', recipient: 'mkhulu6@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:06:51 AM', recipient: 'nkwele3@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:06:35 AM', recipient: 'siphalipty1@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:06:14 AM', recipient: 'refithileagency@yahoo.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:05:52 AM', recipient: 'siphalipty1@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:05:17 AM', recipient: 'NONDUMISAS@GMAIL.COM', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:04:49 AM', recipient: 'masekoluyanda3@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:04:28 AM', recipient: 'ritohlu@awesome-events.co.za', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:04:04 AM', recipient: 'mabiletsathabang@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 3:03:45 AM', recipient: 'chiloaneoscar16@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:58:15 AM', recipient: 'mvelasenkonzo@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:57:52 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:57:33 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:57:12 AM', recipient: 'songo.m@gmail.com', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:56:42 AM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: '📢 Your Monthly Statement is Here – Let’s Keep It Friendly!', status: 'Sent' },
    { timestamp: '2/24/2025, 2:46:41 AM', recipient: 'ntandosetrading@gmail.com', subject: 'Quotation 213 – Valid Until 3/3/2025', status: 'Sent' },
    { timestamp: '2/24/2025, 2:35:45 AM', recipient: 'mncubeh@thelinkgroup.net.za', subject: 'Quotation 212– Valid Until 2/28/2025', status: 'Sent' },
    { timestamp: '2/20/2025, 8:12:08 PM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202580 – Due 2/27/2025', status: 'Sent' },
    { timestamp: '2/20/2025, 8:01:44 PM', recipient: 'songo.m@gmail.com', subject: 'Quotation 211 – Valid Until 2/27/2025', status: 'Sent' },
    { timestamp: '2/19/2025, 4:24:29 PM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Invoice 20202565 – Due 11/14/2024', status: 'Sent' },
    { timestamp: '2/19/2025, 12:32:53 PM', recipient: 'siphalipty1@gmail.com', subject: 'Invoice #[Invoice Number] – Due [Due Date]', status: 'Sent' },
    { timestamp: '2/18/2025, 8:26:16 PM', recipient: 'sibozomp@gmail.com', subject: 'Quotation 210 – Valid Until 2/25/2025', status: 'Sent' },
    { timestamp: '2/18/2025, 7:18:09 PM', recipient: 'musawenkosicm@gmail.com', subject: 'Quotation 209 – Valid Until 2/25/2025', status: 'Sent' },
    { timestamp: '2/17/2025, 6:23:34 PM', recipient: 'muneiyowgaty@gmail.com', subject: 'Invoice 20202579 – Due 2/24/2025', status: 'Sent' },
    { timestamp: '2/13/2025, 5:15:33 PM', recipient: 'lukhanyolukay@gmail.com', subject: 'Quotation VILLAGE CINEMA LINE – Valid Until 2/20/2025', status: 'Sent' },
    { timestamp: '2/13/2025, 1:42:27 PM', recipient: 'mkhulu6@gmail.com', subject: 'Order Confirmation – 225', status: 'Sent' },
    { timestamp: '2/12/2025, 12:27:46 PM', recipient: 'mkhulu6@gmail.com', subject: 'Quotation 205 – Valid Until 2/19/2025', status: 'Sent' },
    { timestamp: '2/10/2025, 6:07:32 PM', recipient: 'songo.m@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '2/10/2025, 5:00:45 PM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202578 – Due  2/17/2025', status: 'Sent' },
    { timestamp: '2/10/2025, 4:51:54 PM', recipient: 'songo.m@gmail.com', subject: 'Quotation 204 – Valid Until 2/17/2025', status: 'Sent' },
    { timestamp: '2/8/2025, 11:54:37 PM', recipient: 'info@ijlanga.co.za', subject: '1002850116', status: 'Sent' },
    { timestamp: '2/8/2025, 11:53:31 PM', recipient: 'egov.rfqreplies@gauteng.gov.za', subject: '1002850116', status: 'Sent' },
    { timestamp: '2/3/2025, 8:10:18 AM', recipient: 'info@ijlanga.co.za', subject: 'Access Token', status: 'Sent' },
    { timestamp: '2/3/2025, 7:29:13 AM', recipient: 'mkhulu6@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:28:09 AM', recipient: 'nkwele3@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:26:40 AM', recipient: 'siphalipty1@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:26:17 AM', recipient: 'refithileagency@yahoo.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:24:52 AM', recipient: 'siphalipty1@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:23:12 AM', recipient: 'NONDUMISAS@GMAIL.COM', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:22:36 AM', recipient: 'masekoluyanda3@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:21:33 AM', recipient: 'ritohlu@awesome-events.co.za', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:21:00 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:19:23 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:18:06 AM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:17:12 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:16:46 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:16:01 AM', recipient: 'songo.m@gmail.com', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:14:13 AM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Your Account Statement – [Ij Langa Consulting]', status: 'Sent' },
    { timestamp: '2/3/2025, 7:04:07 AM', recipient: 'info@ijlanga.co.za', subject: 'Invoice #[Invoice Number] – Due [Due Date]', status: 'Sent' },
    { timestamp: '2/3/2025, 6:28:23 AM', recipient: 'siphalipty1@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '2/3/2025, 6:25:32 AM', recipient: 'siphalipty1@gmail.com', subject: 'Payment Receipt – Thank You for Your Business', status: 'Sent' },
    { timestamp: '1/30/2025, 9:49:15 PM', recipient: 'siphalipty1@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/28/2025, 10:11:41 PM', recipient: 'mkhulu6@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/28/2025, 2:41:21 PM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202576 from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/14/2025, 10:25:55 PM', recipient: 'banzizulu@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/13/2025, 9:05:25 AM', recipient: 'banzizulu@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/8/2025, 7:58:34 AM', recipient: 'masekoluyanda3@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/6/2025, 9:19:18 PM', recipient: 'NONDUMISAS@GMAIL.COM', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/5/2025, 11:11:20 AM', recipient: 'songo.m@gmail.com', subject: 'Receipt for Payment of 67486', status: 'Sent' },
    { timestamp: '1/5/2025, 10:17:31 AM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202572 from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/5/2025, 10:16:02 AM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202572 from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/3/2025, 8:25:54 PM', recipient: 'mncubeh@thelinkgroup.net.za', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '1/1/2025, 8:10:47 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '1/1/2025, 8:10:12 AM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '1/1/2025, 7:54:34 AM', recipient: 'info@azalecomms.co.za', subject: 'Folder', status: 'Sent' },
    { timestamp: '12/24/2024, 9:23:46 AM', recipient: 'songo.m@gmail.com', subject: 'Invoice 20202571 from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '12/24/2024, 9:18:13 AM', recipient: 'songo.m@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '12/14/2024, 11:14:32 AM', recipient: 'luyolontshwanti@gmail.com', subject: 'Your Quote from Ij Langa Consulting', status: 'Sent' },
    { timestamp: '12/13/2024, 4:46:08 AM', recipient: 'nkwele3@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:45:55 AM', recipient: 'refithileagency@yahoo.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:45:41 AM', recipient: 'masekoluyanda3@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:45:27 AM', recipient: 'ritohlu@awesome-events.co.za', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:45:15 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:45:01 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:44:47 AM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:44:34 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:43:46 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:42:42 AM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Thank You for 2024 & Your Latest Account Statement', status: 'Sent' },
    { timestamp: '12/13/2024, 4:29:30 AM', recipient: 'sandico.enterprises@gmail.com', subject: 'Quotation 188 for MARCO PANCH DENZYL KRUGER 8202255146080', status: 'Sent' },
    { timestamp: '12/12/2024, 2:17:55 PM', recipient: 'Elton.masheke@enthamedia.co.za', subject: 'Quotation 186 for ENTHA MEDIA', status: 'Sent' },
    { timestamp: '12/11/2024, 10:38:45 AM', recipient: 'info@ijlanga.co.za', subject: 'Sales Invoice @@Reference@@ for @@Customer@@', status: 'Sent' },
    { timestamp: '12/11/2024, 10:36:22 AM', recipient: 'info@ijlanga.co.za', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '12/3/2024, 10:41:31 AM', recipient: 'VSAKHILE27@GMAIL.COM', subject: 'Quotation 185 for THOKOZA NHLANHLA INVESTMENTS', status: 'Sent' },
    { timestamp: '12/2/2024, 12:13:55 PM', recipient: 'Info.globalbsolutions@gmail.com', subject: 'Quotation 184 for MOHAUMOLUTSI CIVIL WORKS', status: 'Sent' },
    { timestamp: '12/2/2024, 9:33:47 AM', recipient: 'INFO.GLOBALBSOLUTIONS@GMAIL.COM', subject: 'Quotation 183for Mr MTHOBISI DERRICK XABA', status: 'Sent' },
    { timestamp: '12/2/2024, 9:33:47 AM', recipient: 'INFO.GLOBALBSOLUTIONS@GMAIL.COM', subject: 'Quotation 183for Mr MTHOBISI DERRICK XABA', status: 'Sent' },
    { timestamp: '11/30/2024, 10:16:48 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Sales Invoice [#InvoiceNumber] for [CustomerName]', status: 'Sent' },
    { timestamp: '11/30/2024, 3:56:54 AM', recipient: 'nkwele3@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:56:37 AM', recipient: 'refithileagency@yahoo.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:56:02 AM', recipient: 'masekoluyanda3@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:55:41 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:55:19 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:55:04 AM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:54:48 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:54:48 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:54:34 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/30/2024, 3:53:21 AM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/27/2024, 2:55:03 PM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Receipt for Payment of 20202569 ', status: 'Sent' },
    { timestamp: '11/27/2024, 2:51:05 PM', recipient: 'nkwele3@gmail.com', subject: 'Sales Invoice 20202570 for Surprise Tuckshop & General', status: 'Sent' },
    { timestamp: '11/27/2024, 2:42:45 PM', recipient: 'nkwele3@gmail.com', subject: 'Quotation 182 for Surprise Tuckshop & General', status: 'Sent' },
    { timestamp: '11/27/2024, 1:20:30 PM', recipient: 'hmahlalela@mpg.gov.za', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 1:20:12 PM', recipient: 'tertiankosi@gmail.com', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 1:19:52 PM', recipient: 'pymvambo@mpg.gov.za', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 1:17:50 PM', recipient: 'pymvambo@mpg.gov.za', subject: 'Quotation 181for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 1:16:39 PM', recipient: 'hmahlalela@mpg.gov.za', subject: 'Quotation #Quote-Number for ##NAME##', status: 'Sent' },
    { timestamp: '11/27/2024, 12:50:08 PM', recipient: 'tertiankosi@gmail.com', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 12:49:28 PM', recipient: 'pymvambo@mpg.gov.za', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/27/2024, 12:49:07 PM', recipient: 'hmahlalela@mpg.gov.za', subject: 'Quotation 180 for Agriculture, Rural Development Land & Environmental Affairs', status: 'Sent' },
    { timestamp: '11/23/2024, 4:57:00 PM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Sales Invoice 20202569 for AZALE COMMUNICATIONS (PTY) LTD', status: 'Sent' },
    { timestamp: '11/22/2024, 10:17:49 PM', recipient: 'INFO@AZALECOMMS.CO.ZA', subject: 'Quotation 179for AZALE COMMUNICATIONS (PTY) LTD', status: 'Sent' },
    { timestamp: '11/18/2024, 6:25:00 PM', recipient: 'refithileagency@yahoo.com', subject: 'Sales Invoice [#20202568] for [REBONE PROD ZA]', status: 'Sent' },
    { timestamp: '11/18/2024, 6:14:35 PM', recipient: 'refithileagency@yahoo.com', subject: 'Sales Invoice [#20202567] for [Refithile Agency]', status: 'Sent' },
    { timestamp: '11/17/2024, 9:30:40 AM', recipient: 'refithileagency@yahoo.com', subject: 'Quotation 176 for Refithile Agency', status: 'Sent' },
    { timestamp: '11/9/2024, 6:07:07 AM', recipient: 'refithileagency@yahoo.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/9/2024, 6:01:37 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '11/8/2024, 8:42:16 AM', recipient: 'masekoluyanda3@gmail.com', subject: 'Quotation 175 for MDALUKWANE PROJECTS ENTERPRISE', status: 'Sent' },
    { timestamp: '11/7/2024, 10:59:50 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Receipt for Payment of 20202565', status: 'Sent' },
    { timestamp: '11/7/2024, 10:45:40 AM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Quotation Ref165 for JO CHILOANE', status: 'Sent' },
    { timestamp: '11/4/2024, 2:13:39 PM', recipient: 'Info.globalbsolutions@gmail.com', subject: 'Quotation 174 for OFENTSE SAMUEL MALAPANE', status: 'Sent' },
    { timestamp: '11/3/2024, 8:29:06 PM', recipient: 'refithileagency@yahoo.com', subject: 'Sales Invoice 20202554 for [CustomerName]', status: 'Sent' },
    { timestamp: '11/3/2024, 8:23:56 PM', recipient: 'refithileagency@yahoo.com', subject: 'Quotation 173 for Refithile Agency', status: 'Sent' },
    { timestamp: '10/31/2024, 7:04:00 PM', recipient: 'ritohlu@awesome-events.co.za', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/31/2024, 7:03:42 PM', recipient: 'mabiletsathabang@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/31/2024, 7:03:06 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/31/2024, 7:02:55 PM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/31/2024, 7:02:41 PM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/31/2024, 6:57:05 PM', recipient: 'refithileagency@yahoo.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/30/2024, 8:53:57 AM', recipient: 'songo.m@gmail.com', subject: 'Receipt for Payment of 20202564 ', status: 'Sent' },
    { timestamp: '10/29/2024, 11:09:45 AM', recipient: 'songo.m@gmail.com', subject: 'Sales Invoice 2020256] for CHULUMANCO LILI...', status: 'Sent' },
    { timestamp: '10/29/2024, 11:02:09 AM', recipient: 'songo.m@gmail.com', subject: 'Quotation 172 for CHULUMANCO LILI...', status: 'Sent' },
    { timestamp: '10/26/2024, 12:28:09 AM', recipient: 'refithileagency@yahoo.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/26/2024, 12:27:47 AM', recipient: 'ritohlu@awesome-events.co.za', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/26/2024, 12:27:15 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/26/2024, 12:26:52 AM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/26/2024, 12:26:14 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/26/2024, 12:25:54 AM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Copy of Statement', status: 'Sent' },
    { timestamp: '10/24/2024, 12:23:35 PM', recipient: 'luthzconcepts@gmail.com', subject: 'New Company Registration - 2024/671875/07', status: 'Sent' },
    { timestamp: '10/24/2024, 12:21:34 PM', recipient: 'luthulidn@gmail.com', subject: 'New Company Registration - 2024/671875/07', status: 'Sent' },
    { timestamp: '10/24/2024, 12:17:43 PM', recipient: 'songo.m@gmail.com', subject: 'Sales Invoice [20202563] for LUTHZ CONCEPTS', status: 'Sent' },
    { timestamp: '10/24/2024, 12:17:43 PM', recipient: 'songo.m@gmail.com', subject: 'Sales Invoice [20202563] for LUTHZ CONCEPTS', status: 'Sent' },
    { timestamp: '10/24/2024, 12:13:19 PM', recipient: 'songo.m@gmail.com', subject: 'Sales Invoice [20202560] for Luthz Corporation', status: 'Sent' },
    { timestamp: '10/23/2024, 8:59:27 PM', recipient: 'songo.m@gmail.com', subject: 'Statement of  Account', status: 'Sent' },
    { timestamp: '10/22/2024, 2:05:38 PM', recipient: 'Chiloaneoscar16@gmail.com', subject: 'Folder', status: 'Sent' },
    { timestamp: '10/22/2024, 1:32:15 PM', recipient: 'songo.m@gmail.com', subject: 'Statement of  Account', status: 'Sent' },
    { timestamp: '10/21/2024, 6:40:52 AM', recipient: 'fikile.mabhena@ygmail.com', subject: 'Quotation 169 FIKILE KUYENZEKA KUNGUMUSA', status: 'Sent' },
    { timestamp: '10/21/2024, 6:40:29 AM', recipient: 'fikile.mabhena@yahoo.com', subject: 'Quotation 169 FIKILE KUYENZEKA KUNGUMUSA', status: 'Sent' },
    { timestamp: '10/17/2024, 8:37:01 PM', recipient: 'info@ijlanga.co.za', subject: 'Quotation #Quote-Number for ##NAME##', status: 'Sent' },
    { timestamp: '10/17/2024, 8:37:01 PM', recipient: 'info@ijlanga.co.za', subject: 'Quotation #Quote-Number for ##NAME##', status: 'Sent' },
    { timestamp: '10/17/2024, 8:28:48 PM', recipient: 'info@ijlanga.co.za', subject: 'Quotation [#QuoteNumber] for [CustomerName]', status: 'Sent' },
    { timestamp: '10/17/2024, 8:27:33 PM', recipient: 'info@ijlanga.co.za', subject: 'Folder', status: 'Sent' },
    { timestamp: '10/17/2024, 7:16:18 PM', recipient: 'nkuyahaeholdings@gmail.com', subject: 'Quotation168 for NKUYAHAE HOLDINGS (PTY)LTD', status: 'Sent' },
    { timestamp: '10/16/2024, 8:12:01 PM', recipient: 'nkuyahaeholdings@gmail.com', subject: 'Quotation 168 for NKUYAHAE HOLDINGS (PTY)LTD', status: 'Sent' },
    { timestamp: '10/10/2024, 5:49:41 PM', recipient: 'mvelasenkonzo@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '10/10/2024, 5:49:07 PM', recipient: 'chiloaneoscar16@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '10/9/2024, 5:30:18 PM', recipient: 'bongiwechiloane.bc@gmail.com', subject: 'Quotation 167 for Alinda Jacob Jr', status: 'Sent' },
    { timestamp: '10/8/2024, 7:31:49 PM', recipient: 'Mkhizeayanda92@gmail.com', subject: 'Sales Invoice 20202562 for FEZEKA CIVIL EN...', status: 'Sent' },
    { timestamp: '10/8/2024, 2:59:19 PM', recipient: 'mabiletsathabang@gmail.com', subject: 'Sales Invoice [#InvoiceNumber] for [CustomerName]', status: 'Sent' },
    { timestamp: '10/8/2024, 2:41:27 PM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Quotation 165 for Rev JUDAS OSCAR CHILOANE', status: 'Sent' },
    { timestamp: '10/8/2024, 2:39:50 PM', recipient: 'chiloaneoscar16@gmail.com', subject: 'Quotation 165 for Rev JUDAS OSCAR CHILOANE', status: 'Sent' },
    { timestamp: '10/8/2024, 1:00:06 PM', recipient: 'songo.m@gmail.com', subject: 'Sales Invoice INV-20202548 for SNM Holding', status: 'Sent' },
    { timestamp: '10/8/2024, 12:59:35 PM', recipient: 'sibongilemnisi21@gmail.com', subject: 'Sales Invoice INV-20202548 for SNM Holding', status: 'Sent' },
    { timestamp: '10/4/2024, 8:27:37 AM', recipient: 'mvelasenkonzo@gmail.com', subject: 'Sales Invoice [#InvoiceNumber] for [CustomerName]', status: 'Sent' },
    { timestamp: '10/1/2024, 7:35:15 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Receipt for Payment of [67470', status: 'Sent' },
    { timestamp: '10/1/2024, 7:35:15 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Receipt for Payment of [67470', status: 'Sent' },
    { timestamp: '10/1/2024, 7:02:02 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: '', status: 'Sent' },
    { timestamp: '10/1/2024, 6:57:43 AM', recipient: 'kgotsoinnocent77@gmai.com', subject: 'Customer', status: 'Sent' },
    { timestamp: '9/30/2024, 8:51:13 PM', recipient: 'songo.m@gmail.com', subject: 'MODIMETSI EVENTS MANAGEMENT', status: 'Sent' },
    { timestamp: '9/25/2024, 2:32:27 PM', recipient: 'songo.m@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '9/21/2024, 3:27:48 AM', recipient: 'ij.langa11@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '9/21/2024, 3:27:18 AM', recipient: 'mabiletsathabang@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '9/21/2024, 3:26:49 AM', recipient: 'songo.m@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '9/21/2024, 3:23:49 AM', recipient: 'mkhulu6@gmail.com', subject: '', status: 'Sent' },
    { timestamp: '9/21/2024, 2:58:14 AM', recipient: 'mabiletsathabang@gmail.com', subject: 'THABANG HENDRICK', status: 'Sent' },
    { timestamp: '9/20/2024, 9:23:53 AM', recipient: 'Ritohlu@goldstatusgroup.co.za', subject: 'Invoice', status: 'Sent' },
    { timestamp: '9/20/2024, 9:09:11 AM', recipient: 'ritohlu@awesome-events.co.za', subject: '', status: 'Sent' },
    { timestamp: '9/20/2024, 8:04:01 AM', recipient: 'mkhulu6@gmail.com', subject: '', status: 'Sent' }
  ];

  const filteredData = communicationData.filter(item =>
    item.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMessageType = (subject: string) => {
    if (subject.includes('Quotation')) return { type: 'Quote', color: 'bg-blue-100 text-blue-800' };
    if (subject.includes('Invoice') || subject.includes('Payment')) return { type: 'Invoice', color: 'bg-green-100 text-green-800' };
    if (subject.includes('Statement')) return { type: 'Statement', color: 'bg-purple-100 text-purple-800' };
    if (subject.includes('Receipt')) return { type: 'Receipt', color: 'bg-emerald-100 text-emerald-800' };
    return { type: 'Other', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600">Communication logs and business analytics</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search communications by recipient or subject..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Communications</p>
                <p className="text-2xl font-bold text-slate-900">{communicationData.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quotations Sent</p>
                <p className="text-2xl font-bold text-blue-900">
                  {communicationData.filter(item => item.subject.includes('Quotation')).length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payment Reminders</p>
                <p className="text-2xl font-bold text-amber-900">
                  {communicationData.filter(item => item.subject.includes('Statement') || item.subject.includes('Reminder')).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-900">100%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Communication Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left p-4 font-medium text-gray-900">Recipient</th>
                  <th className="text-left p-4 font-medium text-gray-900">Subject</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const messageType = getMessageType(item.subject);
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-sm">{item.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{item.recipient}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-md">
                          <p className="text-sm text-slate-900 truncate">{item.subject}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={messageType.color}>
                          {messageType.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
